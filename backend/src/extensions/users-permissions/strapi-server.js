// src/extensions/users-permissions/strapi-server.js

module.exports = (plugin) => {
  plugin.controllers.user.updateProfile = async (ctx) => {
    const { id } = ctx.state.user;
    const { password, ...data } = ctx.request.body;
  
    if (!id) {
      return ctx.badRequest("User not authenticated");
    }
  
    const updatedUser = await strapi.entityService.update(
      "plugin::users-permissions.user",
      id,
      {
        data,
      }
    );
  
    // Manual sanitization - remove sensitive fields
    const { password: _, resetPasswordToken, confirmationToken, ...sanitizedUser } = updatedUser;
    
    return sanitizedUser;
  };

  plugin.routes["content-api"].routes.push({
    method: "PUT",
    path: "/user/profile",
    handler: "user.updateProfile",
    config: {
      policies: ["global::isAuthenticated"],
    },
  });

  return plugin;
};
