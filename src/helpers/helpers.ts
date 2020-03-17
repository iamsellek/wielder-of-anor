import chalk from 'chalk';
import fs from 'fs';

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
