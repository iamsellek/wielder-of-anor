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

export const getArrayFromCommaDileneatedString = (fileContents: string) => {
  if (fileContents) {
    return fileContents.split(',');
  }

  return [];
};

export const addNewItemsToExistingArray = (
  array: string[],
  newItems: string[]
): string[] => [...array, ...newItems];

export const printOneArrayIndexPerLine = (array: string[]) => {
  if (array.length) {
    array.forEach((item, index) => {
      console.log(chalk.italic(`${index + 1}) ${item}`));
    });
  } else {
    console.log(chalk.red('No words have been added yet.'));
  }
};

export const writeValuesToFile = (values: string[], filePath: string) => {
  fs.writeFileSync(filePath, values.join(','));
};

export const checkAndCommit = async (
  commitMessage: string,
  forbiddenWords: string[]
) => {
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
  } else if (status.not_added.length === status.files.length) {
    console.log(
      chalk.red(
        `Please ${chalk.italic(
          'git add'
        )} at least one file and try running Wielder of Anor again.`
      )
    );
  }

  const addedFiles = status.files.filter(
    file => !status.not_added.includes(file.path)
  );

  addedFiles.forEach(file => {
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

export const runCommit = async (commitMessage: string) => {
  git.commit(commitMessage);
};
