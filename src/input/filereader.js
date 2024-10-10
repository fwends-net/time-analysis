/**
 * Methods for reading files from the harddisk. This is as interesting as it sounds like.
 */



import { readdir, readFile } from 'node:fs/promises';
import { INPATH } from '../common/constants.js';
import { resolve } from 'node:path';

/**
 * Returns a list of file names that are in INPATH
 */
export async function listFiles() {
  console.debug('Listing files in %s.', INPATH);
  const filesInPath = await readdir(INPATH, { withFileTypes: true });
  let path = INPATH;
  let files = [];
  if (!path.endsWith('/')) {
    path += '/';
  }

  for (let i=0; i < filesInPath.length; i++) {
    if (filesInPath[i].isFile()) {
      if (isValid(getExtension(filesInPath[i].name))) {
        files.push(path + filesInPath[i].name);
      } else {
        console.warn('Ignoring file %s with unknown extension.', filesInPath[i].name);
      }
      
    }
  }
  return files;
}

/**
 * We only understand txt and csv files. This is just a very simple way to avoid trying to read a binary format.
 * @param {*} ext 
 * @returns 
 */
function isValid(ext) {
  return ext === 'txt' || ext === 'csv';
}

/**
 * Returns the part behind the last '.' of a file name. Empty string if there isn't one.
 * @param {*} file 
 * @returns 
 */
function getExtension(file) {
  let temp = file.split('.');
  if (temp.length > 1) {
    return temp[temp.length - 1];
  } else {
    return '';
  }
}

/**
 * Loads a file. This is more than just reading, it is also splitting the file into multiple lines, each containing
 * multiple columns.
 * 
 * @param {*} filepath 
 * @returns 
 */
export async function loadFile(filepath) {
  const filePath = resolve(filepath);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  
  let raw_data = splitContent(contents);
  return raw_data;
}

function splitContent(input, value_delimiter = ',') {
  let raw_data = input.split('\n');
  let data = [];
  for (let i =0; i < raw_data.length; i++) {
    data.push(splitLine(raw_data[i], value_delimiter));
  }
  return data;
}

function splitLine(line, delimiter = ',') {
  return line.split(delimiter);
}