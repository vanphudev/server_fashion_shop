"use strict";

const __RESPONSE = require("../core/");
const {
   logOut,
   signIn,
   handlerRefreshToken,
   getAccId,
   createAccount,
} = require("../services/accessService/customerAccess");

const __AUTH_CONTROLLER__ = {
   signIn: async (req, res) => {
      new __RESPONSE.GET({
         message: "SignIn successfully",
         metadata: await signIn(req, res),
         request: req,
      }).send(res);
   },
   logOut: async (req, res) => {
      new __RESPONSE.GET({
         message: "Log out successfully",
         metadata: await logOut(req),
         request: req,
      }).send(res);
   },
   handlerRefreshToken: async (req, res) => {
      new __RESPONSE.GET({
         message: "Refresh token successfully",
         metadata: await handlerRefreshToken(req, res),
         request: req,
      }).send(res);
   },
   getAccId: async (req, res) => {
      new __RESPONSE.CREATED({
         message: "Get account Info successfully",
         metadata: await getAccId(req),
         request: req,
      }).send(res);
   },
   createAccount: async (req, res) => {
      new __RESPONSE.CREATED({
         message: "Create account successfully",
         metadata: await createAccount(req, res),
         request: req,
      }).send(res);
   },
};

module.exports = __AUTH_CONTROLLER__;
