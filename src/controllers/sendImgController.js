import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sendImgController = (req, res) => {
    const fileName = req.params.imgName;
    res.sendFile(`${process.cwd()}/src/assets/imgs/${fileName}`, (error) => {
        if (error) {
            res.status(404).send("image not found.");
        }
    });
}

export default sendImgController;