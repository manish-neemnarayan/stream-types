const fs = require("node:fs/promises");

// file size copied: 9.9 gb 
// memory usage: ~40 MB
// execution time: ~15.5 seconds

(async () => {
    console.time("read many");

    const sourceFile = await fs.open("./test-big.txt", "r");
    const destFile = await fs.open("./dest-big.txt", "w");

    const readStream = sourceFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    readStream.pipe(writeStream);
    readStream.on("end", () => {
        console.timeEnd("read many");
    })

})();