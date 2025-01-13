import pg from "pg";
import { sql } from "../configs/config.js";

const db = new pg.Client(sql); // login postgreSQL
db.connect(); // connect database

export default db; // export to queries.js