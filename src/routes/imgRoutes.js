// route to send private images

import express from "express";
const imgRoutes = express.Router();

// import the imgAuth function to handle key authentication
import imgAuth from "../middlewares/auth/imgAuth.js";

import { sendRoomImgController, sendAvatarImgController } from "../controllers/otherControllers/sendImgController.js";

imgRoutes.get("/room/:imgName", [imgAuth.checkKey(), sendRoomImgController]); // check the key, if key is correct, sendRoomImgController will send an image
imgRoutes.get("/avatar/:imgName", [imgAuth.checkKey(), sendAvatarImgController]); // check the key, if key is correct, sendAvatarImgController will send an image

export default imgRoutes; // export to lib/app.js