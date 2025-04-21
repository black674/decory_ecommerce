// src/policies/isAuthenticated.js

module.exports = (policyContext, config, { strapi }) => {
  if (policyContext.state.user) {
    // If a user is authenticated, pass the request
    return true;
  }

  return false; // If no user is found, block the request
};
