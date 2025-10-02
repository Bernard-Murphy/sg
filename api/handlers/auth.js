const auth_get_init = (event, context) => {
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

const auth_post_login = (event, context) => {
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

const auth_post_register = (event, context) => {
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
  auth_get_init,
  auth_post_login,
  auth_post_register,
};
