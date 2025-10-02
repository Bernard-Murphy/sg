const Busboy = require("busboy");
const crypto = require("crypto");

const parseFormData = (event) => {
  return new Promise((resolve, reject) => {
    try {
      const busboy = Busboy({
        headers: {
          ...event.headers,
          "content-type":
            event.headers["Content-Type"] || event.headers["content-type"],
        },
      });
      const result = {};

      busboy.on("file", (fieldname, file, properties) => {
        file.on("data", (data) => {
          let previous = (result.files = result.files || {})[fieldname];
          const fileData = {
            data: data,
            ...properties,
            mimetype: properties.mimeType,
            contentType: properties.mimeType,
            md5: crypto.createHash("md5").update(data).digest("hex"),
            size: Number(Buffer.byteLength(Buffer.from(data))),
            name: properties.filename,
          };
          if (previous && !previous.length) previous = [previous];
          result.files[fieldname] = previous
            ? [...previous, fileData]
            : fileData;
        });
      });
      busboy.on("field", (fieldname, value) => {
        try {
          result[fieldname] = JSON.parse(value);
        } catch (err) {
          result[fieldname] = value;
        }
      });
      busboy.on("error", (error) => reject(`Parse error: ${error}`));
      busboy.on("finish", () => {
        event.body = result;
        resolve(event);
      });
      busboy.write(event.body, event.isBase64Encoded ? "base64" : "binary");
      busboy.end();
    } catch (err) {
      console.log("Parse form data error", err);
      reject();
    }
  });
};

module.exports = parseFormData;
