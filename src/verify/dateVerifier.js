import { COL_START, COL_END } from "../common/constants.js";
import dayjs from "dayjs";

/**
 * This method checks if an entry has a valid start date and a valid end date.
 * It also tries to fix a missing date if possible.
 * 
 * TODO this is not a good implementation because it creates a side effect,
 * manipulating the input array.
 * 
 * It will do for now, but we need to find a different way to perform the modification
 * before the test is happening.
 * 
 * (It might also be ok for the verifier to give its ok to the dates if the modification
 * of input could be performed, but it is up to a different function to actually do it)
 * 
 * @param {*} input 
 * @returns 
 */
export function isValid(input) {

  let lastEndDate = undefined;
  

  for (let i = 0; i < input.length; i++) {
    let entry = input[i];
    let startTest = dayjs(entry[COL_START]);
    let endTest = dayjs(entry[COL_END]);
    // no valid start date
    if (! validDate(startTest)) {
      // if the entry in front of this one has a valid end date, we will set
      // the start date of this entry to the end date of the previous one.
      // if there is no entry in front we will throw an error
      if (entry[COL_START] === '' && i > 0 && validDate(dayjs(input[i][COL_END]))) {
        console.log('Entry %s is missing start date. Will derive from previous entry.', i);
        let startDate = dayjs(input[i-1][COL_END]);
        console.log('New start date is %s.', startDate.format('YYYY-MM-DD HH:mm'));
        entry[COL_START] = startDate.format('YYYY-MM-DD HH:mm');
      } else {
        console.error('Start date of entry is invalid: %s', startTest);
        console.error(entry);
        return false;  
      }

    }
    //no valid end date
    if (! validDate(endTest)) {
      // same as above - if there is no valid end date, we will try to fix it by checking the next
      // entry (and its start date) and use it if possible.
      // if we are already on the last entry, we will throw an error.
      if (entry[COL_END] === '' && i < input.length - 1 && validDate(dayjs(input[i+1][COL_START]))) {
        console.log('Entry %s is missing end date. Will derive from next entry.', i);
        let endDate = dayjs(input[i+1][COL_START]);
        console.log('New end date is %s.', endDate.format('YYYY-MM-DD HH:mm'));
        entry[COL_END] =  endDate.format('YYYY-MM-DD HH:mm');
      } else {
        console.error('End date of entry is invalid: %s', endTest);
        console.error(entry);
        return false;  
      }

    }
  }
  return true;

}


/**
 * Returns true if the date can be formatted into YYYY-MM-DD HH:mm
 * 
 * @param {*} date 
 * @returns 
 */
function validDate(date) {
  if ( date.format("YYYY-MM-DD HH:mm") === 'Invalid Date') {
    return false;
  }
  return true;
}