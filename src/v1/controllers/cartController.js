"use strict";

const __RESPONSE = require("../core/");
const {getCartById} = require("../services/cartService");

const __CART_CONTROLLER__ = {
   getCartById: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get cart by id successfully",
         metadata: await getCartById(req),
         request: req,
      }).send(res);
   },
};

module.exports = __CART_CONTROLLER__;
