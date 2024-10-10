import dayjs from 'dayjs';

import { COL_START } from '../common/constants.js';

/**
 * Sorts an input array by time entry start date and returns a new,
 * sorted array
 * @param {*} input 
 */
export function transform(input) {
  let out = [...input];
  out.sort((a,b) => {
    let da = dayjs(a[COL_START]);
    let db = dayjs(b[COL_START]);

    if (da.isBefore(db)) {
      return -1;
    }
    if (da.isAfter(db)) {
      return 1;
    }
    // this is actually bad news, because if they both start at the same time ...
    // well, who am i to judge?
    return 0;
  });

  return out;
}