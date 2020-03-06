import { CommanderStatic } from 'commander';
import { checkAndCommit, runCommit, checkForForbiddenWords } from './helpers';
import {
  addNewItemsToExistingArray,
  getArrayFromCommaDileneatedString,
  getFileContents,
  printOneArrayIndexPerLine,
  writeValuesToFile,
} from './helpers';

const wordsPath = 'words.csv';
const branchesPath = 'branches.csv';
let words: string[] = getFileContents(wordsPath);
let branches: string[] = getFileContents(branchesPath);

export const main = (program: CommanderStatic) => {
  if (program.addWord) {
    const newWords = getArrayFromCommaDileneatedString(program.addWord);
    words = addNewItemsToExistingArray(words, newWords);
    writeValuesToFile(words, wordsPath);
  } else if (program.words) {
    printOneArrayIndexPerLine(words, 'words');
  } else if (program.addBranch) {
    const newBranches = getArrayFromCommaDileneatedString(program.addBranch);
    branches = addNewItemsToExistingArray(branches, newBranches);
    writeValuesToFile(branches, branchesPath);
  } else if (program.branches) {
    printOneArrayIndexPerLine(branches, 'branches');
  } else if (program.commit) {
    checkAndCommit(program.commit, words, branches);
  } else if (program.forceCommit) {
    runCommit(program.forceCommit, branches);
  } else {
    checkForForbiddenWords(words);
  }
};
