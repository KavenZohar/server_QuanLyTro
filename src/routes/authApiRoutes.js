import express from "express";
const authApiRoutes = express.Router();

// importing middleware functions for admin authentication
import { authAdminLogin, authAdminLogout } from "../middlewares/auth/adminAuth.js";

// router for admin login, using authAdminLogin middleware
authApiRoutes.post("/admin/login", authAdminLogin);

// router for admin logout, using authAdminLogout middleware
authApiRoutes.post("/admin/logout", authAdminLogout);

export default authApiRoutes; // export to routes.js