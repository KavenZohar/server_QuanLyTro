const sendImgController = (req, res) => {
    const fileName = req.params.imgName; // get the image name
    res.sendFile(`${process.cwd()}/src/assets/imgs/${fileName}`, (error) => { // send to user
        if (error) {
            res.status(404).send("image not found."); // if the image does not exist, return error
        }
    });
}

export default sendImgController;