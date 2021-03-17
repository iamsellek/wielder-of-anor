import { OptionValues } from 'commander';
import {
  checkAndCommit,
  checkForForbiddenWords,
  runCommit,
} from './helpers/git';
import {
  addNewItemsToExistingArray,
  getArrayFromCommaDileneatedString,
  getFileContents,
  printOneArrayIndexPerLine,
  writeValuesToFile,
} from './helpers/helpers';

const wordsPath = 'words.csv';
const branchesPath = 'branches.csv';
let words: string[] = getFileContents(wordsPath);
let branches: string[] = getFileContents(branchesPath);

export const main = (options: OptionValues) => {
  if (options.addWord) {
    const newWords = getArrayFromCommaDileneatedString(options.addWord);
    words = addNewItemsToExistingArray(words, newWords);
    writeValuesToFile(words, wordsPath);
  } else if (options.words) {
    printOneArrayIndexPerLine(words, 'words');
  } else if (options.addBranch) {
    const newBranches = getArrayFromCommaDileneatedString(options.addBranch);
    branches = addNewItemsToExistingArray(branches, newBranches);
    writeValuesToFile(branches, branchesPath);
  } else if (options.branches) {
    printOneArrayIndexPerLine(branches, 'branches');
  } else if (options.commit) {
    checkAndCommit(options.commit, words, branches);
  } else if (options.forceCommit) {
    runCommit(options.forceCommit);
  } else {
    checkForForbiddenWords(words);
  }
};
