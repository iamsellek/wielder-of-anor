import simpleGit from 'simple-git/promise';
import chalk from 'chalk';
import fs from 'fs';

const git = simpleGit();

export const checkAndCommit = async (
  commitMessage: string,
  forbiddenWords: string[],
  forbiddenBranches: string[]
) => {
  await checkForForbiddenBranch(forbiddenBranches);
  await checkForForbiddenWords(forbiddenWords);
  await runCommit(commitMessage);
};

export const checkForForbiddenWords = async (forbiddenWords: string[]) => {
  const status = await git.status();
  let foundForbiddenWord: boolean = false;

  if (status.conflicted.length) {
    console.log(
      chalk.red('Please fix your conflicts before running Wielder of Anor.')
    );

    process.exit();
  } else if (!status.staged.length && !status.created.length) {
    console.log(
      chalk.red(
        `Please ${chalk.italic(
          'git add'
        )} at least one file and try running Wielder of Anor again.`
      )
    );
    console.log();

    process.exit();
  } else {
    const filesToCheck = status.files.filter(
      file =>
        !status.not_added.includes(file.path) &&
        !status.deleted.includes(file.path)
    );

    filesToCheck.forEach(file => {
      const { path } = file;

      if (path.endsWith('.json')) {
        return;
      }

      const contents = fs.readFileSync(path);

      forbiddenWords.forEach(forbiddenWord => {
        if (contents.includes(forbiddenWord)) {
          console.log(
            chalk.yellow(`Found word '${forbiddenWord}' in file ${path}.`)
          );
          console.log();
          foundForbiddenWord = true;

          return true;
        }
      });
    });

    if (foundForbiddenWord) {
      console.log(chalk.red('Found forbidden word(s). Quitting.'));

      process.exit();
    }
  }
};

export const checkForForbiddenBranch = async (forbiddenBranches: string[]) => {
  if (forbiddenBranches.includes((await git.branchLocal()).current)) {
    console.log(chalk.red('You are trying to commit to a forbidden branch!'));

    process.exit();
  }
};

export const runCommit = async (commitMessage: string) => {
  git.commit(commitMessage);
  console.log('Committed successfully!');

  process.exit();
};
