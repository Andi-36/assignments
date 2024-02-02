let a = 1;
//console.log(a);

let str = " Test"

str.toLocaleLowerCase

var b = 6;
//console.log(b);

/* for (let i =0; i < 100000000000000000; i ++){
    b= b+ i;
} */
//console.log(b);

const calcArithmetic = (a, b, fntocall) => {
  return fntocall(a, b);
};

const sum = (a, b) => {
  return a + b;
};

const sub = (a, b) => {
  return a - b;
};

const logSum = () => {
  console.log(6 + 6);
};

//console.log(calcArithmetic(10, 5, sum));
//console.log(calcArithmetic(10, 5, sub));

v = 7;
//console.log("v)");

//console.log(v);

var v = 9;

//console.log(v);

const counter = (inNum) => {
  for (let index = inNum; index > 0; index--) {
    console.log(index);
  }
};

//counter(30);

const calcExecutionTime = () => {
  console.time();
  setTimeout(logSum, 3* 1000);
  console.timeEnd();

};

//calcExecutionTime();

const timeNow = () => {
    let date = new Date();
    console.log(date.toTimeString().substring(0,9));
}

const consoleWatch = () => {
    setInterval(timeNow, 1000)
}

//consoleWatch();

const fs = require('fs');

function readFile() {
  return new Promise((resolve, reject) => {
    fs.readFile("a.txt","utf-8", function(err, data){
      resolve(data);
      //reject(data)
    })
  })
}

async function vachFile() {
  let val  = await readFile();
  console.log('val', val);
}

vachFile();
console.log("After vach file");

/* readFile()
.then((data)=>{
  console.log("data resolve", data);
})
.catch((err)=>{
  console.log("data reject", err);

}) */