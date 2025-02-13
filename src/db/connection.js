import pg from "pg";
import { sqlConfig } from "../configs/config.js";

const pgPool = new pg.Pool(sqlConfig); // login postgreSQL

export default pgPool; // export to models/