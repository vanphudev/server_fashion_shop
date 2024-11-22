"use strict";

const __RESPONSE = require("../core/");
const {order, getOrders} = require("../services/thanhToan");

const __ORDER_CONTROLLER__ = {
   order: async (req, res) => {
      new __RESPONSE.GET({
         message: "Order successfully !",
         metadata: await order(req, res),
         request: req,
      }).send(res);
   },
   getOrders: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all orders successfully !",
         metadata: await getOrders(req, res),
         request: req,
      }).send(res);
   },
};

module.exports = __ORDER_CONTROLLER__;
