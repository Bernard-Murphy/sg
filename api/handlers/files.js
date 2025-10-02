const files_post = (event, context) => {
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
