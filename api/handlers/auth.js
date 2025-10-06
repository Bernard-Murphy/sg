const { normalizeEventBody } = require("../utils/methods");

const auth_get_init = (event, context, cb) => {
  console.log("auth_get_init");
  try {
    throw "test";
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: {
          id: 1,
          username: "test",
          files: [],
        },
      }),
    });
  } catch (err) {
    console.log(err, "err auth_get_init");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

const auth_post_login = (event, context, cb) => {
  event.body = normalizeEventBody(event.body);
  console.log("auth_post_login", event.body);
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: {
          ...event.body,
          files: [],
        },
      }),
    });
  } catch (err) {
    console.log(err, "err auth_post_login");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

const auth_post_register = (event, context, cb) => {
  event.body = normalizeEventBody(event.body);
  console.log("auth_post_register", event.body);
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        user: {
          ...event.body,
          files: [],
        },
      }),
    });
  } catch (err) {
    console.log(err, "err auth_post_register");
    cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

const auth_get_logout = (event, context, cb) => {
  try {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    console.log(err, "err auth_get_logout");
    return cb(null, {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
};

module.exports = {
  auth_get_init,
  auth_post_login,
  auth_post_register,
  auth_get_logout,
};
