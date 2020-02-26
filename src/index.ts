#!/usr/bin/env node

import clear from 'clear';
import program from 'commander';
import { checkAndCommit, runCommit } from './helpers';
import {
  addNewItemsToExistingArray,
  getArrayFromCommaDileneatedString,
  getFileContents,
  printOneArrayIndexPerLine,
  writeValuesToFile,
} from './helpers';

clear();

const wordsPath = 'words.csv';
const branchesPath = 'branches.csv';
let words: string[] = getFileContents(wordsPath);
let branches: string[] = getFileContents(branchesPath);

program
  .version('1.0.0')
  .description('A gatekeeper that protects your remote git repo.')
  .option(
    '-w, --addWord <word>',
    'Add a new forbidden word or a new list of comma-dileneated words.'
  )
  .option('-W, --words', 'List all forbidden words.')
  .option(
    '-b --addBranch <branch>',
    'Add a new forbidden branch or a new list of comma-dileneated branches.'
  )
  .option('-B --branches', 'List all forbidden branches.')
  .option(
    '-c, --commit',
    'Check your staged files and commit if no errors are found.'
  )
  .option(
    '-f, --forceCommit <message>',
    'Force a commit, without checking for forbidden words.'
  )
  .parse(process.argv);

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
}
