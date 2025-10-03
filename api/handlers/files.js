const files_post = (event, context) => {
  console.log("files_post");
  return {
    context,
    return: {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  };
};

const files_patch = (event, context) => {
  console.log("files_patch");
  return {
    context,
    return: {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  };
};

const files_delete = (event, context) => {
  console.log("files_delete");
  return {
    context,
    return: {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    },
  };
};

module.exports = {
  files_post,
  files_patch,
  files_delete,
};
