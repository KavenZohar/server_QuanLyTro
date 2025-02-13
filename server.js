import app from "./src/lib/app.js";
import scssChange from "./src/utils/compileScss.js";
import dotenv from "dotenv";

// environment variables
dotenv.config();
const port = process.env.PORT;

scssChange();

// start server
app.listen(port, () => {
    console.log(`Server is starting on port: http://localhost:${port}/`);
});