import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pg from "pg";
import env from "dotenv";
env.config();


// postgresql config
const sqlConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
    allowExitOnIdle: false,
    statement_timeout: 10000,
    query_timeout: 5000,
    idle_in_transaction_session_timeout: 60000
}


const pgPool = new pg.Pool(sqlConfig);
// initialize pgSession to store login sessions
const pgSession = connectPgSimple(session);
// session config
const sessionConfig = {
    store: new pgSession({
        pool: pgPool,
        tableName: process.env.SESSION_TABLE_NAME
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    }
}

export {
    sqlConfig, // export db/connection.js
    sessionConfig, // export lib/app.js
};