// this contains functions for handling private image transmission

// function to handle sending room images
const sendRoomImg = (req, res) => {
    const fileName = req.params.imgName; // get the image name
    res.sendFile(`${process.cwd()}/src/assets/imgs/${fileName}`, (error) => { // send to user
        if (error) {
            res.status(404).send("image not found."); // if the image does not exist, return error
        }
    });
}

// function to handle sending the admin's avatar image
const sendAvatarImg = (req, res) => {
    const fileName = req.params.imgName; // get the image name
    res.sendFile(`${process.cwd()}/src/assets/avatar/${fileName}`, (error) => { // send to user
        if (error) {
            res.status(404).send("image not found."); // if the image does not exist, return error
        }
    });
}

export { sendRoomImg, sendAvatarImg }; // export to routes/imgRoutes.js