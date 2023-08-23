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
const fs = require("node:fs/promises");
// Execution Time: 270 ms
// CPU Consumption: 100% (1core)
// Memory Consumption: ~400 MB
// don't do it this way not a good practice

(async () => {
  try {
    console.time("writeMany");
    const fileHandler = await fs.open("./test.txt", "w");
    const stream = fileHandler.createWriteStream();
    for (let i = 0; i < 1000000; i++) {
      const buff = Buffer.from(`${i} `, "utf8");
      stream.write(buff);
    }
    fileHandler.close();
    console.timeEnd("writeMany");
  } catch (error) {
    console.log(error);
  }
})();
