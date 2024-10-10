
import { listFiles, loadFile } from './filereader.js';
import {transform as daySplitTransform} from '../transformer/daySplitTransformer.js';
import {transform as sortTransform} from '../transformer/sortTransformer.js';
import { transform as gapFillTransform } from '../transformer/gapFillTransformer.js';
import {transform as labelGroupTransform} from '../transformer/labelGroupTransformer.js';
import {transform as quarterHourTransform} from '../transformer/quarterHourTransformer.js';
export async function parse() {
  // Step 1: List all the files that we have
  let files = await listFiles();
  let timeEntries = [];
  //Step 2: iterate over those files and get their contents.
  for (let i = 0; i < files.length; i++ ) {
    console.log('Loading file %s/%s', i+1, files.length);
    let contents = await loadFile(files[i]);
    //check if the time entry is basically valid
    for (let j=0; j < contents.length; j++) {
      let validity = isValid(contents[j]);
      if (!validity.isValid) {
        console.warn('Line %s from file %s is invalid. Reason: %s',j+1,files[i],validity.reason);
        contents.splice(j, 1);
      }
    }
    timeEntries = timeEntries.concat(contents);
  }
  console.log('Found a total of %s time entries in %s files.', timeEntries.length, files.length);
  let cleanData = daySplitTransform(timeEntries); //this needs to happen
  cleanData = gapFillTransform(cleanData); //this needs to happen
  cleanData = sortTransform(cleanData); //this needs to happen
  cleanData = labelGroupTransform(cleanData); //this can happen
  cleanData = quarterHourTransform(cleanData);
  
  for (let i=0; i < cleanData.length; i++) {
    console.log(cleanData[i]);
  }
  
}

/**
 * 
 * @param {*} entry 
 * @returns 
 */
function isValid(entry){
  //TODO implement more checks, specifically order of columns and if we can parse each date.
  if (entry.length < 4) {
    return {isValid: false, reason: 'Entries need at least 4 columns.'};
  }
  if (entry[0].startsWith('#')) {
    return {isValid: false, reason: 'Entry is commented out.'};
  }

  return {isValid: true, reason: ''};
}




//module.exports = { parse };