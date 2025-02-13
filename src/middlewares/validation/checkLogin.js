const loginCheck = (req, res, next) => {
    if (req.isUnauthenticated()) {
        next();
    } else {
        res.redirect("/admin/manages");
    }
}

export default loginCheck; // export to routes/homeRoutes.js