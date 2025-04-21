// src/api/review/controllers/review.js
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::review.review', ({ strapi }) => ({
  async create(ctx) {
    const user = ctx.state.user;

    if (!user) {
      return ctx.unauthorized(`You're not logged in`);
    }

    const { body } = ctx.request;

    const response = await strapi.entityService.create('api::review.review', {
      data: {
        ...body.data,
        users_permissions_user: user.id,
      },
    });

    return this.transformResponse(response);
  },
}));
