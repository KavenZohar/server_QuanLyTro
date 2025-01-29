import env from "dotenv";
env.config();

const sql = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
}

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

const imgKey = process.env.IMG_KEY;

const hostUrl = "http://localhost:" + process.env.PORT;

export {
    sql,
    sessionConfig,
    imgKey,
    hostUrl
};