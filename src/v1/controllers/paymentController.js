"use strict";

const __RESPONSE = require("../core/");
const {getAllPaments} = require("../services/paymentService");

const __PM_CONTROLLER__ = {
   getAllPaments: async (req, res) => {
      new __RESPONSE.GET({
         message: "Get all paments successfully !",
         metadata: await getAllPaments(req, res),
         request: req,
      }).send(res);
   },
};

module.exports = __PM_CONTROLLER__;
