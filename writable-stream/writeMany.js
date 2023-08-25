// const fs = require("node:fs/promises");

//Execution Time: ~13 seconds
//CPU Consumption: 100% (1core)
// CPU average: 7.6% of total capacity and calculated bases on (all cores & threads)
//Memory Consumption: 46 MB

// (async () => {
//   try {
//     console.time("writeMany");
//     const fileHandler = await fs.open("./test.txt", "w");
//     for (let i = 0; i < 1000000; i++) {
//       await fileHandler.write(`${i} `);
//     }
//     fileHandler.close();
//     console.timeEnd("writeMany");
//   } catch (error) {
//     console.log(error);
//   }
// })();

// callback way -------------------------------------------------------------------
// const fs = require("node:fs");

//Execution Time: ~2.6 seconds
//CPU Consumption: 100% (1core)
//Memory Consumption: 500 MB upto 1gb

// (async () => {
//   fs.open("./test.txt", "w", (err, fd) => {
//     console.time("write many");
//     if (err) throw err;
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(`${i} `, "utf8");
//       fs.writeSync(fd, buff);
//     }
//     fs.closeSync(fd);
//     console.timeEnd("write many");
//   });
// })();

// using streams-------------------------------------------------------------------
// const fs = require("node:fs/promises");
// // Execution Time: 270 ms
// // CPU Consumption: 100% (1core)
// // Memory Consumption: ~400 MB
// // don't do it this way not a good practice

// (async () => {
//   try {
//     console.time("writeMany");
//     const fileHandler = await fs.open("./test.txt", "w");
//     const stream = fileHandler.createWriteStream();
//     console.log(stream.writableHighWaterMark);
//     for (let i = 0; i < 1000000; i++) {
//       const buff = Buffer.from(`${i} `, "utf8");
//       stream.write(buff);
//     }
//     fileHandler.close();
//     console.timeEnd("writeMany");
//   } catch (error) {
//     console.log(error);
//   }
// })();

const fs = require("node:fs/promises");
// Refactoring the above code  using streams
// Execution Time:
// CPU Consumption: 100% (1core)
// Memory Consumption: 45 MB
// refactored-----------------
(async () => {
  try {
    console.time("writeMany");
    const fileHandler = await fs.open("../copy-using-pipe/test.txt", "w");
    const stream = fileHandler.createWriteStream();

    let i = 0;


    function writeMany() {
        while (i <= 1000000) {
          const buff = Buffer.from(`${i} `, "utf8");
          if(i === 1000000) {
            return stream.end(buff);
          }
          if (!stream.write(buff)) break;
          i++;
        }      
    }
    writeMany();
    stream.on("drain", () => {
      writeMany();
    });

    stream.on("finish", () => {
      console.log("Done");
      console.timeEnd("writeMany");
      fileHandler.close();
    })

  } catch (error) {
    console.log(error);
  }
})();
