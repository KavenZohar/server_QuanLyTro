// route to handle tasks when the admin or client is not logged in

import express from "express";
const homeRoutes = express.Router();

import loginCheck from "../middlewares/validation/checkLogin.js";

import getHome from "../controllers/otherControllers/getHome.js";
import getLogin from "../controllers/adminControllers/getLogin.js";

homeRoutes.get("/", getHome);

// admin login route: The checkLog function checks whether the admin is logged in.
// if already logged in, redirect to the admin home page, otherwise send the admin login route.
homeRoutes.get("/auth/admin/login", [loginCheck, getLogin]);

export default homeRoutes; // export to routes.js