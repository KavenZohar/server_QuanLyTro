


import express from "express";
const manageRoutes = express.Router();

import getManageController from "../controllers/getManageController.js";

manageRoutes.get("/", getManageController);

export default manageRoutes;