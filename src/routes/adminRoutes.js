// file containing all admin routers for adding, updating, editing, and deleting operations

import express from "express";
const adminRoutes = express.Router();

import getManages from "../controllers/adminControllers/getManages.js";
import getClients from "../controllers/adminControllers/getClients.js";

adminRoutes.get("/manages", getManages);
adminRoutes.get("/clients", getClients);


export default adminRoutes; // export to routes.js