
import { listFiles, loadFile } from './filereader.js';
import { transform as daySplitTransform } from '../transformer/daySplitTransformer.js';
import { transform as truncateSecondsTransform } from '../transformer/granularityTransformer.js';
import { transform as sortTransform } from '../transformer/sortTransformer.js';
import { transform as gapFillTransform } from '../transformer/gapFillTransformer.js';
import { transform as labelGroupTransform } from '../transformer/labelGroupTransformer.js';
import { transform as quarterHourTransform } from '../transformer/quarterHourTransformer.js';
import { buildOutput } from '../output/htmlBuilder.js';
import { buildStyles } from '../output/styles.js';

import { isValid as hasNoOverlap} from '../verify/overlapVerifier.js';
import { isValid as hasCorrectStartEndSequence } from '../verify/startEndVerifier.js';
import { isValid as hasValidLength } from '../verify/lengthVerifier.js';


export async function parse() {
  // Step 1: List all the files that we have
  let files = await listFiles();
  let timeEntries = [];
  //Step 2: iterate over those files and get their contents.
  for (let i = 0; i < files.length; i++ ) {
    console.log('Loading file %s/%s', i+1, files.length);
    let contents = await loadFile(files[i]);
    timeEntries = timeEntries.concat(contents);
  }
  console.log('Found a total of %s time entries in %s files.', timeEntries.length, files.length);
  let cleanData = daySplitTransform(timeEntries); //this needs to happen
  cleanData = sortTransform(cleanData); //this needs to happen
  cleanData = truncateSecondsTransform(cleanData); //this needs to happen

  if (! hasValidLength(cleanData)) {
    console.error("Aborting with length error. Please fix your input data.");
    process.exit(1);

  }

  if (! hasCorrectStartEndSequence(cleanData)) {
    console.error("Aborting with start/end sequence error. Please fix your input data.");
    process.exit(1);
  }
  //now we need to verify
  if (!hasNoOverlap(cleanData)) {
    console.error("Aborting with overlap error. Please fix your input data.");
    process.exit(1);
  }


  cleanData = gapFillTransform(cleanData); //this needs to happen
  cleanData = labelGroupTransform(cleanData); //this can happen
  cleanData = quarterHourTransform(cleanData);
  /*
  for (let i=0; i < cleanData.length; i++) {
    console.log(cleanData[i]);
  }
    */
   console.log('Writing output.');
   await buildOutput(cleanData);
   buildStyles(cleanData);
  console.log('Done.');
}

