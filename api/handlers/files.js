const files_post = (event, context, cb) => {
  console.log("files_post");
  cb(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  });
};

const files_patch = (event, context, cb) => {
  console.log("files_patch");
  cb(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  });
};

const files_delete = (event, context, cb) => {
  console.log("files_delete");
  cb(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  });
};

module.exports = {
  files_post,
  files_patch,
  files_delete,
};
