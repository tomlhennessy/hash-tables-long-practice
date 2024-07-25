function anagrams(str1, str2) {
  if (str1.length !== str2.length) return false;

  const count = {};

  for (let char of str1) {
    count[char] = (count[char] || 0) + 1;
  }

  for (let char of str2) {
    if (!count[char]) return false;
    count[char]--;
  }

  return true;
}


function commonElements(arr1, arr2) {
  const set1 = new Set(arr1);
  const common = new Set();

  for (let num of arr2) {
    if (set1.has(num)) {
      common.add(num);
    }
  }

  return Array.from(common);
}


function duplicate(arr) {
  const seen = new Set();

  for (let num of arr) {
    if (seen.has(num)) {
      return num;
    }
    seen.add(num);
  }
}


function twoSum(nums, target) {
  const complements = new Set();

  for (let num of nums) {
    if (complements.has(num)) {
      return true;
    }
    complements.add(target - num);
  }

  return false;
}


function wordPattern(pattern, strings) {
  if (pattern.length !== strings.length) return false;

  const patternToWord = {};
  const wordToPattern = {};

  for (let i = 0; i < pattern.length; i++) {
    const pat = pattern[i];
    const word = strings[i];

    if (!patternToWord[pat]) patternToWord[pat] = word;
    if (!wordToPattern[word]) wordToPattern[word] = pat;

    if (patternToWord[pat] !== word || wordToPattern[word] !== pat) {
      return false;
    }
  }

  return true;
}


module.exports = [anagrams, commonElements, duplicate, twoSum, wordPattern];
