import env from "dotenv";
env.config();

const sql = {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
}

const imgKey = process.env.IMG_KEY;

export {
    sql,
    imgKey
};