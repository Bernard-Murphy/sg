const auth_get_init = (event, context, cb) => {
  console.log("auth_get_init");
  cb(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  });
};

const auth_post_login = (event, context, cb) => {
  console.log("auth_post_login");
  cb(null, {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  });
};

const auth_post_register = (event, context, cb) => {
  console.log("auth_post_register");
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({}),
  };
};

module.exports = {
  auth_get_init,
  auth_post_login,
  auth_post_register,
};
