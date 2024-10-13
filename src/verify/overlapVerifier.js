import { COL_START, COL_END } from "../common/constants.js";
import dayjs from "dayjs";

/**
 * Checks if the end of entry 1 is before the start of entry 2.
 * 
 * @param {*} input 
 * @returns 
 */
export function isValid(input) {

  // well, if there aren't more than one entries, an overlap is simply
  // impossible.
  if (input.length < 2) {
    return true;
  }

  for (let i=1; i < input.length; i++) {
    let a = dayjs(input[i-1][COL_END]);
    let b = dayjs(input[i][COL_START]);

    if (a.isAfter(b,"minute")) {
      console.error('Error in input. Entry end date is after next start date:');
      console.error(input[i-1]);
      console.error(input[i]);
      return false;
    }
  }


  return true;
}