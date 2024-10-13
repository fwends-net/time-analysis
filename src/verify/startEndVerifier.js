import { COL_START, COL_END } from "../common/constants.js";
import dayjs from "dayjs";

/**
 * Checks if the entry is well-formed in the sense of the end date being after the start date
 * 
 * @param {*} input 
 * @returns 
 */
export function isValid(input) {
  
  for (let i=0; i < input.length; i++) {
    let a = dayjs(input[i][COL_START]);
    let b = dayjs(input[i][COL_END]);

    if (a.isAfter(b, "minute")) {
      console.error('Error in input. Start date is after end date:');
      console.error(input[i]);
      return false;
    }

  } 

  return true;
}