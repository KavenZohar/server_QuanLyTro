import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import passport from "passport";

// middleware function for admin authentication
import { authAdminCheck } from "../middlewares/auth/adminAuth.js";

import routes from "../routes/routes.js";

// session configuration options
import { sessionConfig } from "../configs/config.js";

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

// router for private assets
app.use("/img", routes.img);

// router to handle unauthenticated user routes
app.use("/", routes.home);

// router to handle API login and logout routes
app.use("/api/auth", routes.authApi);

// router to handle interactions from the admin
app.use("/admin", [authAdminCheck, routes.admin]);

export default app; // export to server.js
export { passport }; // export to middlewares/auth/adminAuth.js