const {
  auth_get_init,
  auth_get_logout,
  auth_post_login,
  auth_post_register,
} = require("./handlers/auth");
const { files_post, files_patch, files_delete } = require("./handlers/files");

module.exports = {
  auth_get_init,
  auth_get_logout,
  auth_post_login,
  auth_post_register,
  files_post,
  files_patch,
  files_delete,
};
