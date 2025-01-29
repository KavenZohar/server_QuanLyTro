import app from "./src/lib/app.js";
import dotenv from "dotenv";

// environment variables
dotenv.config();
const port = process.env.PORT;

// start server
app.listen(port, () => {
    console.log(`Server is starting on port: http://localhost:${port}/`);
});