const fs = require("node:fs/promises");

(async function() {
    const fileHandler = await fs.open("./test.txt", "r");
    const stream = fileHandler.createReadStream();

    stream.on("data", (chunk) => {
        console.log("-------------");
        console.log(chunk);
    })
})()