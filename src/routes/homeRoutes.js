// route to handle tasks when the admin or client is not logged in

import express from "express";
const homeRoutes = express.Router();

import loginCheck from "../middlewares/validation/checkLogin.js";

import getHomeController from "../controllers/userControllers/getHomeController.js";
import getLoginController from "../controllers/userControllers/adminControllers/getLoginController.js";

homeRoutes.get("/", getHomeController);

// admin login route: The checkLog function checks whether the admin is logged in.
// if already logged in, redirect to the admin home page, otherwise send the admin login route.
homeRoutes.get("/auth/admin/login", [loginCheck, getLoginController]);

export default homeRoutes; // export to lib/app.js