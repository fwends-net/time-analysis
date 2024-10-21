import { COL_START, COL_END } from "../common/constants.js";
import dayjs from "dayjs";

export function isValid(input) {

  for (let i = 0; i < input.length; i++) {
    let entry = input[i];
    let startTest = dayjs(entry[COL_START]);
    let endTest = dayjs(entry[COL_END]);
    if (! validDate(startTest)) {
      console.error('Start date of entry is invalid: %s', startTest);
      console.error(entry);
      return false;
    }
    if (! validDate(endTest)) {
      console.error('End date of entry is invalid: %s', endTest);
      console.error(entry);
      return false;
    }
  }
  return true;

}

function validDate(date) {
  console.log(date.format("YYYY-MM-DD HH:mm"));
  if ( date.format("YYYY-MM-DD HH:mm") === 'Invalid Date') {
    return false;
  }
  return true;
}