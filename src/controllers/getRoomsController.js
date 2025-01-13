import { rooms, ranges } from "../db/models.js"; // import database
import log from "../utils/logs.js";

const getRoomsController = async (req, res) => {
    const rangesId = parseInt(req.params.rangesId); // get rangesId
    try {
        if (!isNaN(rangesId)) { // check if the value is NaN in case the user inputs a string instead of a number
            const roomsData = await rooms.getByRangeId(rangesId); // retrieve room data by rangesId
            const rangeData = await ranges.find(rangesId); // retrieve range data by rangesId

            const emptyRoom = roomsData.filter(room => !room.used); // retrieve empty room

            let totalUsers = 0;
            roomsData.forEach(room => {
                totalUsers = room.total_users + totalUsers;
            }); // retrieve total users to each room

            res.json({
                range_name: rangeData.name ? rangeData.name : rangeData.message,
                total_rooms: rangeData.name ? roomsData.length : roomsData[0].message,
                empty_room: rangeData.name ? emptyRoom.length : rangeData.message,
                total_users: rangeData.name ? totalUsers : rangeData.message,
                rooms: roomsData
            }); // returns data to the client
        } else {
            log.StrangeRequest(req);
    
            res.status(404).json({
                error: "does not exist."
            });
        }
    } catch (error) {
        log.ErrorServer(error); // save error
    }

}

export default getRoomsController; // export to roomRoutes.js