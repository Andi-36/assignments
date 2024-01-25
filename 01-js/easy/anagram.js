/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  return testAnagram(str1) === testAnagram(str2);
}

function testAnagram(str) {
  return str.trim().toLocaleLowerCase().split("").sort().join();
}

isAnagram("Debit Card", "Bad Credit");

module.exports = isAnagram;
