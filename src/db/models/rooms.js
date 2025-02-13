import pgPool from "../connection.js";
import imgAuth from "../../middlewares/auth/imgAuth.js";
import log from "../../utils/logs.js";

function formatMoney(money) {
    return money.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

const rooms = {
    getByRangeId: async function (rangesId) {
       const client = await pgPool.connect();
       try {
           const imgKey = await imgAuth.key();

           const result = await client.query("SELECT ranges.name, rooms.id, rooms.name, price, used, range_id FROM ranges JOIN rooms ON ranges.id = rooms.range_id WHERE ranges.id = $1 ORDER BY id ASC", 
                [
                    rangesId
                ]); // retrieve room data from the database

           const rooms = result.rows;
           if (rooms.length > 0) { // check if ranges exist
               const roomsData = await Promise.all(
                    rooms.map( async room => {
                            const memberResult = await client.query("SELECT members.id FROM rooms JOIN members ON rooms.id = room_id WHERE rooms.id = $1", 
                                [
                                    room.id
                                ]
                            );

                            const imgResult = await client.query("SELECT image_url FROM rooms JOIN room_images ON rooms.id = room_id WHERE rooms.id = $1", 
                                [
                                    room.id
                                ]
                            );

                            // retrieve members in each room from the database
                            const member = memberResult.rows;
                            // retrieve img in each room from the database
                            const imgs = await Promise.all(
                                imgResult.rows.map(img => img.image_url + "?key=" + imgKey)
                            );
                            
                            return {
                                ...room,
                                price: formatMoney(room.price),
                                total_users: member.length, // add the number of members to each room data
                                image_urls: imgs
                            };
                        })
                );
               
               return roomsData; // return the data that was just edited
           } else {
               return null;
           }

       } catch (error) {
            log.dbErrors(error.message);
       } finally {
            client.release();
       }
    }

}

export default rooms;