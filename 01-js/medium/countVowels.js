/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
    const listOfVowels = ['a', 'e', 'i', 'o', 'u'];
    let cnt = 0;
    for (let index = 0; index < str.length; index++) {
      const element = str.toLocaleLowerCase().charAt(index);
      if(listOfVowels?.includes(element)){
        cnt += 1;
      }  
    }
    return cnt;
}

module.exports = countVowels;