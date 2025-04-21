'use strict';

module.exports = {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/*{ strapi }*/) {},

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap({ strapi }) {

    strapi.db.lifecycles.subscribe({
      models: ["plugin::users-permissions.user"],
  
      async afterCreate(event) {
        const { result } = event;
      
        try {
          // Create a new cart
          const newCart = await strapi.entityService.create("api::cart.cart", {
            data: {
              cartItems: [],
              totalQuantity: 0,
              totalAmount: 0,
            },
          });
      
          // Link the new cart to the user via the User's `cart` field
          await strapi.entityService.update(
            "plugin::users-permissions.user",
            result.id,
            {
              data: {
                cart: newCart.id, // Set the User's `cart` field to the new cart's ID
              },
            }
          );
      
        } catch (error) {
          console.log("❌ Error Creating Cart:", error);
        }
      },

      async beforeDelete(event) {
        const { where } = event;
      
        try {
          // Get the user and populate their cart
          const userToDelete = await strapi.entityService.findOne(
            "plugin::users-permissions.user",
            where.id,
            { populate: { cart: true } }
          );
      
          // Delete the linked cart (if it exists)
          if (userToDelete.cart) {
            await strapi.entityService.delete("api::cart.cart", userToDelete.cart.id);
          }
      
        } catch (error) {
          console.log("❌ Error Deleting Cart:", error);
        }
      }
    });
    
  }
};
