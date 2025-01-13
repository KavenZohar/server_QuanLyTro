// routes for processing all rooms data.
// adding, editing, and deleting.

import express from "express";
const roomsRoutes = express.Router();

import getRoomsController from "../controllers/getRoomsController.js";
import getARoomController from "../controllers/getARoomController.js";

roomsRoutes.get("/:rangesId/rooms", getRoomsController); // get all rooms data by ranges id
roomsRoutes.get("/:rangesId/room", getARoomController);

export default roomsRoutes; // export to app.js