#!/usr/bin/env node

import clear from 'clear';
import program from 'commander';
import { main } from './main';

clear();

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
    '-c, --commit <message>',
    'Check your staged files and commit if no errors are found.'
  )
  .option(
    '-f, --forceCommit <message>',
    'Force a commit, without checking for forbidden words.'
  )
  .parse(process.argv);

main(program);
