import { COL_LABEL, COL_END, COL_TEXT } from "../common/constants.js";
/**
 * Groups neighbouring entries with the same label together by merging them.
 * 
 * work,writing,2024-10-10 08:00, 2024-10-10 09:00
 * work,swearing,2024-10-10 09:00, 2024-10-10 09:04
 * 
 * will become
 * 
 * work,writing;swearing,2024-10-10 08:00, 2024-10-10 09:04
 * 
 * Assumes a sorted input array.
 * 
 * @param {*} input 
 * @returns 
 */
export function transform(input) {
  let out = [];
  for (let i=0; i < input.length; i++) {
    if (out.length > 0) {
      // if the next time entry has the same label as the last time entry, 
      // we only update the end time, merging the two entries into one
      if (out[out.length-1][COL_LABEL] === input[i][COL_LABEL]) {
        console.log('Adding new end time to existing label group');
        out[out.length-1][COL_END] = input[i][COL_END];
        out[out.length-1][COL_TEXT] += ';' + input[i][COL_TEXT]; 
      } else {
        out.push([...input[i]]);
      }
    } else {
      out.push([...input[i]]);
    }
  }

  return out;
}