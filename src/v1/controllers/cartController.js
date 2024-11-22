   "use strict";

   const __RESPONSE = require("../core/");
   const {getCartById, addProductToCart, deleteCart, deleteProductFromCart} = require("../services/cartService");

   const __CART_CONTROLLER__ = {
      getCartById: async (req, res) => {
         new __RESPONSE.GET({
            message: "Get cart by id successfully",
            metadata: await getCartById(req),
            request: req,
         }).send(res);
      },
      addProductToCart: async (req, res) => {
         new __RESPONSE.UPDATE({
            message: "Add product to cart successfully",
            metadata: await addProductToCart(req),
            request: req,
         }).send(res);
      },
      deleteCart: async (req, res) => {
         new __RESPONSE.DELETE({
            message: "Delete cart successfully",
            metadata: await deleteCart(req),
            request: req,
         }).send(res);
      },
      deleteProductFromCart: async (req, res) => {
         new __RESPONSE.DELETE({
            message: "Delete product from cart successfully",
            metadata: await deleteProductFromCart(req),
            request: req,
         }).send(res);
      },
   };

   module.exports = __CART_CONTROLLER__;
