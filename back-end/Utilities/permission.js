const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  else {
    return { error: "Unexpected Error" };
  }
};

module.exports = { checkPermissions };
