"use strict";

const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = {
  async createPaymentIntent(ctx) {
    const { amount, currency } = ctx.request.body;

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: (amount * 100).toFixed(0),
        currency: currency || "usd",
        payment_method_types: ["card"],
      });

      ctx.send({
        clientSecret: paymentIntent.client_secret,
      });
    } catch (error) {
      ctx.status = 400;
      ctx.send({ error: error.message });
    }
  },
};
