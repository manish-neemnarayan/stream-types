const fs = require("node:fs/promises");
const { pipeline } = require("node:stream");
const { error } = require("node:console");

// file size copied: 9.9 gb 
// memory usage: ~40 MB
// execution time: ~15.5 seconds

/**
 * @Note : pipe should not use in production environment coz of poor error handling
 *         in production we can use pipline for more go check https://nodejs.org/api/stream.html
 *         before pipline, pump npm package was used
 * @tools : For cleaning, destroying and error handling : pump npm package, pipline node in-built, stream.finished() method
 */
(async () => {
    console.time("done operation");

    const sourceFile = await fs.open("./test.txt", "r");
    const destFile = await fs.open("./dest.txt", "w");

    const readStream = sourceFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    //--------------pipe method----------------
    // readStream.pipe(writeStream);
    // readStream.on("end", () => {
    //     console.timeEnd("read many");
    // })
    //--------------pipe method----------------

    //--------------pipeline method----------------
    pipeline(readStream, writeStream, (err) => {
        console.log(err);
        console.timeEnd("done operation");
    })
    //--------------pipeline method----------------

})();