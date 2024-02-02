/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

async function wait1(t) {
  await sleep(t);
}

async function wait2(t) {
  await sleep(t);
}

async function wait3(t) {
  await sleep(t);
}

function sleep(second) {
  return new Promise(function (resolve) {
    setTimeout(resolve, second * 1000);
  });
}
function calculateTime(t1, t2, t3) {
  const startTime = new Date().getTime();
  return new Promise((resolve) => {
    wait1(t1).then(() => {
      wait2(t2).then(() => {
        wait3(t3).then(() => {
          const endTime = new Date().getTime();
          resolve(endTime - startTime);
        });
      });
    });
  });
}

module.exports = calculateTime;
