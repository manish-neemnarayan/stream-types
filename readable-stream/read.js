const { copyFileSync } = require("node:fs");
const fs = require("node:fs/promises");

(async function() {
    const fileHandler = await fs.open("./test.txt", "r");
    const fileHandlerWrite = await fs.open("./dest.txt", "w");
    const streamRead = fileHandler.createReadStream();
    const streamWrite = fileHandlerWrite.createWriteStream();
    console.time("read many");

    let split = '';
    streamRead.on("data", (chunk) => {

        //-------extra code for experiment start---------------
        const numbers = chunk.toString('utf8').split(" ");

        if(Number(numbers[0]) !== Number(numbers[1]) - 1) {
            if (split) {
                numbers[0] = split.trim() + numbers[0].trim();
            }
        }

        if(Number(numbers[numbers.length - 2]) + 1 !== Number(numbers[numbers.length - 1])) {
            split = numbers.pop();
        }

        console.log("--------------------------------------");
        console.log(numbers);
        console.log("--------------------------------------");

        //-------extra code for experiment end---------------

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