// process data from the database.
// combine or filter data from the database using processing functions to return results to the controller.

import { getRooms, getMemberInRoom, getRange } from "./queries.js";
import log from "../utils/logs.js";

class rooms {

    static async getByRangeId(rangesId) {
       try {
           const rooms = await getRooms(rangesId); // retrieve room data from the database
    
           if (rooms.length !== 0) { // check if ranges exist
               const newRooms = Promise.all(rooms.map( async room => {
                        const member = await getMemberInRoom(room.id); // retrieve members in each room from the database
                        return {
                            ...room,
                            total_users: member.length // add the number of members to each room data
                        };
                    })
                );
               return await newRooms; // return the data that was just edited
           } else {
               return [{message: "Rooms does not exist"}];
           }

       } catch (error) {
            log.dbErrors(error.message);
       }
    }

}



class ranges {

    static async find(rangesId) {
        try {
            const range = await getRange(rangesId); // retrieve a range by id
            if (range.length !== 0) {
                return range[0];
            } else {
                return {
                    message: "Range does not exist."
               };
            }

        } catch (error) {
            log.dbErrors(error.message);
        }
    }

}

export { rooms, ranges }; // export to /controllers