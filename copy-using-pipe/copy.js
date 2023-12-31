const fs = require("node:fs/promises");


// file size copied: 9.9 gb 
// memory usage: ~34 MB
// execution time: ~19 seconds

// to check the difference, execute the cope-pipe.js file. And difference is significant when file size is gigantic really.
// using pipe is the best way to do it

(async () => {
    console.time("operation many done");

    const sourceFile = await fs.open("./test.txt", "r");
    const destFile = await fs.open("./dest.txt", "w");

    // bytesRead/buffer comes from read().
    // we are not using copy() which uses streams underhood.
    // manually we are trying to copy just like streams using await
    // if bytesRead not equal to 0 means there are some bytes to read then
    // we read() till it is equal to 0 and then writing to destination file.
    let bytesRead = -1;
    while(bytesRead !== 0) {
        const readFile = await sourceFile.read();
        bytesRead = readFile.bytesRead;

        if(bytesRead !== 16384) {
            const indexofEnd = readFile.buffer.indexOf(0);
            const newBuff = Buffer.alloc(indexofEnd);
            // here we need to use copy method of buffer to copy a new buff which is 
            // of size of indexofEnd of buffer having some bytes means where zero starts.
            // after copying new buffer to this we write it to destFile sothat after finishing all 
            // reading it doesn't add weird signs where buffer is empty into the destfile.
            readFile.buffer.copy(newBuff, 0, 0, indexofEnd);
            destFile.write(newBuff);
        } else {
            destFile.write(readFile.buffer);  
        }

    }

    console.timeEnd("operation many done");

})();