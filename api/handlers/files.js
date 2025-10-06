const files_post = (event, context, cb) => {
  console.log("files_post");
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    });
  } catch (err) {
    console.log(err, "err files_post");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

const files_patch = (event, context, cb) => {
  console.log("files_patch");
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    });
  } catch (err) {
    console.log(err, "err files_patch");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

const files_delete = (event, context, cb) => {
  console.log("files_delete");
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({}),
    });
  } catch (err) {
    console.log(err, "err files_delete");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

module.exports = {
  files_post,
  files_patch,
  files_delete,
};
