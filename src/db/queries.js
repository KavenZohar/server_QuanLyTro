import db from "./connection.js";

// queries rooms by ranges
async function getRooms (rangesId) {
    const result = await db.query("SELECT ranges.name, rooms.id, rooms.name, price, used, range_id FROM ranges JOIN rooms ON ranges.id = rooms.range_id WHERE ranges.id = $1 ORDER BY id ASC", 
        [
            rangesId
        ]);

    return result.rows;
}


// queries members by room
async function getMemberInRoom(roomId) {
    const result = await db.query("SELECT members.id, last_name, first_name, gender, phone_number, account FROM rooms JOIN members ON rooms.id = room_id WHERE rooms.id = $1", 
        [
            roomId
        ]
    );

    return result.rows;
}


// queries ranges by rangesId
async function getRange(rangesId) {
    const result = await db.query("SELECT * FROM ranges WHERE id = $1",[
        rangesId
    ]);

    return result.rows;
}

export { 
    getRooms,
    getMemberInRoom,
    getRange
}; // export to models.js