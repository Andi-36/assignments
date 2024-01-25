/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str1) {
  if (str1.length === 0 || str1.length === 1) return true;
  //let str = "";
  let str = str1
    .replace(/[^a-z0-9]/gi, "")
    .toLocaleLowerCase()
    .replaceAll(" ", "");
  let checkPal = false;
  for (let index = 0; index < str.length; index++) {
    console.log(str.charAt(index), "     ", str.charAt(str.length - 1 - index));
    const char1 = str.charAt(index);
    const char2 = str.charAt(str.length - 1 - index);
    checkPal = char1 === char2;

    console.log("checkPal", checkPal);
  }
  return checkPal;
}

isPalindrome("level");

module.exports = isPalindrome;
