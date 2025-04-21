module.exports = () => ({
    'users-permissions': {
    config: {
      register: {
        allowedFields: ["name"],
      },
      jwt: {
        expiresIn: '7d',
      },
    },
  },
});
