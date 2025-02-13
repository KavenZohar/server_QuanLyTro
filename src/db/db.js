import admins from "./models/admins.js";
import ranges from "./models/ranges.js";
import rooms from "./models/rooms.js";

const db = {
    admins: admins,
    ranges: ranges,
    rooms: rooms
}

export default db;