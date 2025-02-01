// this is where middleware functions for authentication
// and verifying the admin user from the database will be handled

import bcrypt from "bcrypt";
import { Strategy } from "passport-local";

import { admin } from "../../db/models.js";
import { passport } from "../../lib/app.js";
import log from "../../utils/logs.js";


//authenticate admin
const authAdminCheck = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.redirect("/auth/admin/login");
    }
}


// check login and respond to the user
const authAdminLogin = (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return res.status(500).json({ message: "Server error.", success: false });
        if (!user) return res.status(401).json({ message: info.message, success: user });
        req.login(user, (err) => {
            if (err) return res.status(500).json({ message: "Login error.", success: false });

            // save login history
            log.loginHistory(req, user, "admin");

            return res.json({ message: info.message, success: true});
        });
    })(req, res, next);
}


// user logout function
const authAdminLogout = (req, res) => {
    req.logout((err) => {
        if (err) log.ErrorServer(err);
        res.json({ message: "Đăng xuất thành công.", success: true });
    })
}


// verify username and password from the database
passport.use("local", new Strategy(async function verify(username, password, cb) {
    try {
        const user = await admin.findByUsername(username); // find user by username from the database
        console.log(user);
        if (!user) {
            // if the user does not exist, callback to the authAdminLogin function
            return cb(null, false, { message: "Tên đăng nhập không tồn tại." });
        } else {
            // retrieve user password from the database
            const storedHashedPassword = user.password;

            // hash the user's password and verify it against the password in the database
            bcrypt.compare(password, storedHashedPassword, (err, valid) => {
                if (err) {
                    console.log(err);
                    log.ErrorServer(err);
                    // if error, callback to the authAdminLogin function
                    return cb(err);
                } else {
                    if (valid) {
                        // if the user verification is correct, callback returns the user to the authAdminLogin function
                        return cb(null, user, { message: "Đăng nhập thành công." });
                    } else {
                        // if the verification fails, return false to the user
                        return cb(null, false, { message: "Mật khẩu không đúng vui lòng đăng nhập lại." });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        log.ErrorServer(error);
    }
}));

// save user to session
passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });

// on the next request, retrieve user from session and automatically log in
passport.deserializeUser( async (id, cb) => {
    const user = await admin.findById(id);
    cb(null, user);
});

export {
    authAdminCheck, // export to the lib/app.js
    authAdminLogin, // export to the routes/authRoutes.js
    authAdminLogout // export to the routes/authRoutes.js
     };