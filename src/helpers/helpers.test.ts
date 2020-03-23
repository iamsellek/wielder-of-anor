import * as helpers from './helpers';
import fs from 'fs';
import chalk from 'chalk';

const consoleLogMock = jest.spyOn(console, 'log').mockImplementation(() => {});
const chalkItalicMock = jest.fn();
const chalkRedMock = jest.fn();
Object.defineProperty(chalk, 'italic', { get: () => chalkItalicMock });
Object.defineProperty(chalk, 'red', { get: () => chalkRedMock });

describe('getFileContents', () => {
  const existsSyncMock = jest.spyOn(fs, 'existsSync');
  const readFileSyncMock = jest.spyOn(fs, 'readFileSync');

  afterEach(() => {
    existsSyncMock.mockClear();
    readFileSyncMock.mockClear();
  });

  test(`returns an empty array if the file doesn't exist`, () => {
    existsSyncMock.mockReturnValueOnce(false);

    expect(helpers.getFileContents('bruh')).toEqual([]);
  });

  test('returns result from getArrayFromCommaDileneatedString if file does exist', () => {
    existsSyncMock.mockReturnValueOnce(true);
    readFileSyncMock.mockReturnValueOnce('fake string');
    const getArrayFromCommaDileneatedStringMock = jest.spyOn(
      helpers,
      'getArrayFromCommaDileneatedString'
    );
    getArrayFromCommaDileneatedStringMock.mockImplementationOnce(() => [
      'bruh',
    ]);

    expect(helpers.getFileContents('bruh')).toEqual(['bruh']);
  });
});

describe('getArrayFromCommaDileneatedString', () => {
  it('should return a string array, separating the strings by commas', () => {
    expect(helpers.getArrayFromCommaDileneatedString('1,2,3,4')).toEqual([
      '1',
      '2',
      '3',
      '4',
    ]);
  });

  it('should return an empty array if comma string is empty', () => {
    expect(helpers.getArrayFromCommaDileneatedString('')).toEqual([]);
  });
});

describe('printOneArrayIndexPerLine', () => {
  afterEach(() => {
    consoleLogMock.mockClear();
    chalkItalicMock.mockClear();
    chalkRedMock.mockClear();
  });

  it('handles the empty state', () => {
    helpers.printOneArrayIndexPerLine([], 'words');
    helpers.printOneArrayIndexPerLine([], 'branches');

    expect(chalkRedMock).toHaveBeenNthCalledWith(
      1,
      'No words have been added yet.'
    );
    expect(chalkRedMock).toHaveBeenNthCalledWith(
      2,
      'No branches have been added yet.'
    );
  });

  it('handles the non-empty state', () => {
    helpers.printOneArrayIndexPerLine(['1', '2', '3'], 'words');

    expect(chalkItalicMock).toHaveBeenNthCalledWith(1, '1) 1');
    expect(chalkItalicMock).toHaveBeenNthCalledWith(2, '2) 2');
    expect(chalkItalicMock).toHaveBeenNthCalledWith(3, '3) 3');
  });
});
