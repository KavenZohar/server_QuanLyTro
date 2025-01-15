import express from "express";
const imgRoutes = express.Router();

import { checkImgKey } from "../middlewares/validation/checkKey.js";
import sendImgController from "../controllers/sendImgController.js";

imgRoutes.get("/:imgName", [checkImgKey, sendImgController]); // Check the key, if key is correct, sendImgController will send an image

export default imgRoutes;