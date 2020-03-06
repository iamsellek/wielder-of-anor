import chalk from 'chalk';
import fs from 'fs';
import simpleGit from 'simple-git/promise';

const git = simpleGit();

export const getFileContents = (filePath: string): string[] => {
  if (fs.existsSync(filePath)) {
    return getArrayFromCommaDileneatedString(fs.readFileSync(filePath, 'utf8'));
  }

  return [];
};

export const getArrayFromCommaDileneatedString = (commaString: string) => {
  if (commaString) {
    return commaString.split(',');
  }

  return [];
};

export const addNewItemsToExistingArray = (
  array: string[],
  newItems: string[]
): string[] => [...array, ...newItems];

export const printOneArrayIndexPerLine = (
  array: string[],
  type: 'words' | 'branches'
) => {
  if (array.length) {
    array.forEach((item, index) => {
      console.log(chalk.italic(`${index + 1}) ${item}`));
    });
  } else {
    console.log(chalk.red(`No ${type} have been added yet.`));
  }
};

export const writeValuesToFile = (values: string[], filePath: string) => {
  fs.writeFileSync(filePath, values.join(','));
};

export const checkAndCommit = async (
  commitMessage: string,
  forbiddenWords: string[],
  forbiddenBranches: string[]
) => {
  await checkForForbiddenWords(forbiddenWords);
  await runCommit(commitMessage, forbiddenBranches);
};

export const checkForForbiddenWords = async (forbiddenWords: string[]) => {
  const status = await git.status();
  let foundForbiddenWord: boolean = false;
  console.log(status);

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
  }

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
};

export const runCommit = async (commitMessage: string, branches: string[]) => {
  if (branches.includes((await git.branchLocal()).current)) {
    console.log(chalk.red('You are trying to commit to a forbidden branch!'));

    process.exit();
  }

  git.commit(commitMessage);
};
