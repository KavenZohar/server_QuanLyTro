import express from "express";
import roomsRoutes from "../routes/roomsRoutes.js";
import manageRoutes from "../routes/manageRoutes.js";
import imgRoutes from "../routes/imgRoutes.js";

const app = express();

app.use(express.static("public"));

// router for api
// data retrieval path using ranges
app.use("/api/ranges", roomsRoutes);

// router for private assets
app.use("/img", imgRoutes);

// router for user
app.use("/manage", manageRoutes);

export default app; // export to server.js