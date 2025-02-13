// route to send private images

import express from "express";
const imgRoutes = express.Router();

// import the imgAuth function to handle key authentication
import imgAuth from "../middlewares/auth/imgAuth.js";

import { sendRoomImg, sendAvatarImg } from "../controllers/otherControllers/sendImg.js";

imgRoutes.get("/room/:imgName", [imgAuth.checkKey(), sendRoomImg]); // check the key, if key is correct, sendRoomImgController will send an image
imgRoutes.get("/avatar/:imgName", [imgAuth.checkKey(), sendAvatarImg]); // check the key, if key is correct, sendAvatarImgController will send an image

export default imgRoutes; // export to routes.js