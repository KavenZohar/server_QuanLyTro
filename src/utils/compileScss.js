import sass from "sass";
import chokidar from "chokidar";
import fs from "fs";

const compileScss = () => {
    const scssPath = process.cwd() + "/src/assets/scss/styles.scss";
    const cssPath = process.cwd() + "/public/css/styles.css";

    try {
        const result = sass.compile(scssPath);
        fs.writeFileSync(cssPath, result.css);
        console.log("SCSS đã được biên dịch thành CSS");
    } catch (error) {
        console.error("Lỗi biên dịch SCSS:", error);
    }
}

function scssChange() {
    chokidar.watch(process.cwd() + "/src/assets/scss/", { persistent: true }).on("change", (filePath) => {
        compileScss();
    });
    compileScss();
}

export default scssChange; // export to server.js