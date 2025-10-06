const m = {};

m.normalizeEventBody = (eventBody) => {
  try {
    if (typeof eventBody === "object")
      return {
        ...eventBody,
      };

    try {
      eventBody = JSON.parse(eventBody);
    } catch (err) {
      eventBody = Buffer.from(eventBody, "base64").toString("utf-8");
    }

    return {
      ...eventBody,
    };
  } catch (err) {
    console.log(err, "normalizeEventBody error");
  }
};

module.exports = m;
