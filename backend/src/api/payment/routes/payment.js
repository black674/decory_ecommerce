"use strict";

module.exports = {
  routes: [
    {
      method: "POST",
      path: "/create-payment-intent",
      handler: "payment.createPaymentIntent",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
