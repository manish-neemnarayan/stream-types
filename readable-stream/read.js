const { copyFileSync } = require("node:fs");
const fs = require("node:fs/promises");

(async function() {
    const fileHandler = await fs.open("./test.txt", "r");
    const fileHandlerWrite = await fs.open("./dest.txt", "w");
    const streamRead = fileHandler.createReadStream();
    const streamWrite = fileHandlerWrite.createWriteStream();
    console.time("read many");
    streamRead.on("data", (chunk) => {
        if(!streamWrite.write(chunk)) {
            streamRead.pause();
        }        
    })
    
    streamWrite.on("drain", () => {
        streamRead.resume();
    })

    streamRead.on("end", () => {
        fileHandler.close();
        console.timeEnd("read many");
    })
})()