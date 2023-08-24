// using streams-------------------------------------------------------------------
const fs = require("node:fs/promises");
const { stderr } = require("node:process");
// Execution Time: 270 ms
// CPU Consumption: 100% (1core)
// Memory Consumption: ~400 MB
// don't do it this way not a good practice

(async () => {
  try {
    console.time("writeMany");
    const fileHandler = await fs.open("./test.txt", "w");
    const stream = fileHandler.createWriteStream();
    console.log(stream.writableHighWaterMark);

    console.log(stream.writableLength);
    console.log(stream.write(Buffer.alloc(16383, "a"))); // under inner buffer default length is 16383
    console.log(stream.write(Buffer.alloc(1, "a"))); // now buffer is filled and gaining extra space in memory
    console.log(stream.writableLength);

    stream.on("drain", () => {
      console.log("Now it is safe to write more"); // this is a drain event which means buffer is empty
    });
    // fileHandler.close();
    console.timeEnd("writeMany");
  } catch (error) {
    console.log(error);
  }
})();

//---------here is the ouput----------------
// asus@manish:~/Desktop/streams$ node writable-stream/writable-stream.js
// 16384
// 0
// true
// false
// 16384
// writeMany: 3.072ms
// Now it is safe to write more
