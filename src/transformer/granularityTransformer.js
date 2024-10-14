import dayjs from "dayjs";
import { COL_START, COL_END} from '../common/constants.js';

/**
 * Sets the input to minute granularity.
 * 
 * @param {*} input 
 * @returns 
 */
export function transform(input) {

  let out = [...input];

  for (let i=0; i < out.length; i++) {
    let entry = out[i];
    let start = dayjs(entry[COL_START]);
    let end = dayjs(entry[COL_END]);

    entry[COL_START] = truncateSeconds(entry[COL_START]);
    entry[COL_END] = truncateSeconds(entry[COL_END]);

  }
  return out;
}

/**
 * Sets seconds to 0 and rounds the minute entry. If seconds were 30 or more, 
 * minutes will get incremented.
 * 
 * @param {*} datetime 
 * @returns 
 */
function truncateSeconds(datetime) {
  let date = dayjs(datetime);
  let seconds = date.get('seconds');
  if (seconds > 29) {
    let m = date.get('minutes');
    date =  date.set(m + 1, 'minutes');
  }  
    return date.set(0, 'seconds').format('YYYY-MM-DD HH:mm');
  
}