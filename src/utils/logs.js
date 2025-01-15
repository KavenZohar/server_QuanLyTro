import fs from "fs";

function Log(file, message) {
    const date = `==>[${new Date().toISOString()}]`;

    if (fs.existsSync(file)) { // check if the file already exists
        fs.appendFile(file, date + message, (err) => { // add content
            if (err) {
                console.error("Error while writing log:", err);
            }
        });
    } else { // if the file does not exist, create it and add content
        fs.writeFile(file, message, (err) => {
            if (err) {
                console.error("Error while writing log:", err);
            }
        });
    }
}

class log {

    // save server error
    static ErrorServer(content) {
        const file = "./logs/server_errors.log";
        const message = `--ERROR: "${content}"\n`;

        Log(file, message);
    }


    // save client error
    static ErrorClient(content) {
        const file = "./logs/client_errors.log";
        const message = `--ERROR by Client: "${content}"\n`;

        Log(file, message);
    }


    // save strange request
    static StrangeRequest(req) {
        const file = "./logs/strange_request.log";
        const message = `--[IP: ${req.ip}]: "${req.method}", "${req.hostname}${req.originalUrl}", "IPs: ${req.ips}"\n`;

        Log(file, message);
    }


    // save database error
    static dbErrors(content) {
        const file = "./logs/db_errors.log";
        const message = `--DB ERROR: "${content}"\n`;

        Log(file, message);
    }

}

export default log;