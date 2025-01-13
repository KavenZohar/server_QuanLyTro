import express from "express";
import roomsRoutes from "../routes/roomsRoutes.js";

const app = express();

// data retrieval path using ranges
app.use("/api/ranges", roomsRoutes);

export default app; // export to server.js