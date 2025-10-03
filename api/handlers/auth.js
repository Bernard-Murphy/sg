const auth_get_init = (event, context) => {
  console.log("auth_get_init");
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
  console.log("auth_post_login");
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
  console.log("auth_post_register");
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
