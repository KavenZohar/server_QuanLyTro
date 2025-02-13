import adminRoutes from "./adminRoutes.js";
import authApiRoutes from "./authApiRoutes.js";
import homeRoutes from "./homeRoutes.js";
import imgRoutes from "./imgRoutes.js";

const routes = {
    admin: adminRoutes,
    authApi: authApiRoutes,
    home: homeRoutes,
    img: imgRoutes
}

export default routes; // export to lib/app.js