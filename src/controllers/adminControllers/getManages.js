import db from "../../db/db.js"; // import database
import log from "../../utils/logs.js";

const getManages = async (req, res) => {

    // get rangesId
    const rangesId = parseInt(req.query.range);
    try {
        // get admin's info
        const userInfo = await db.admins.getInfoById(req.user.id);

        const sendRoomsByRangeId = async (id) => {
            // retrieve range data by rangesId
            const rangeData = await db.ranges.find(id);
            if (!rangeData) return res.status(404).send("Range does not exist.");
            // retrieve room data by rangesId
            const roomsData = await db.rooms.getByRangeId(id);
            // retrieve all ranges list
            const rangesList = await db.ranges.getAll();

            // retrieve empty room
            const emptyRoom = roomsData.filter(room => !room.used);
            // retrieve total users to each room
            let totalUsers = 0;
            roomsData.forEach(room => {
                totalUsers = room.total_users + totalUsers;
            });

            // returns data to the client
            res.render("manages.ejs", {
                data: {
                    page: "manages",
                    title: "Quản lý trọ",
                    admin_avatar: userInfo.avatar_url,
                    range_name: rangeData.name,
                    total_rooms: roomsData.length,
                    empty_room: emptyRoom.length,
                    total_users: totalUsers,
                    rooms: roomsData,
                    ranges_list: rangesList
                }
            });
        };

        if (rangesId) {
            // check if rangesId is a number, then execute
            sendRoomsByRangeId(rangesId);
        } else {
            sendRoomsByRangeId(1);
        }
    } catch (error) {
        // save error
        log.ErrorServer(error);
    }

}

export default getManages; // export to routes/adminRoutes.js