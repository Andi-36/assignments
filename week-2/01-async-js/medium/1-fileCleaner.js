const fs = require('fs');

function readFile() {
    return new Promise((resolve) => {
        fs?.readFile("file.txt", "utf-8",(err,data)=>{
            resolve(data);
        })
    })
}

const trimFile = async() => {
    let data = await readFile();
    let newData = data.replace(/\s+/g, ' ').trim();
    console.log("newData", newData);
}

trimFile();