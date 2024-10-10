import dayjs from "dayjs";
import { COL_START, COL_END } from "../common/constants.js";
/**
 * Will fill any existing gaps in the input array with an "unaccounted" labelled entry.
 * It assumes that the input array is sorted.
 * 
 * @param {*} input 
 */
export function transform(input) {
  let out = [...input];
  for (let i=1; i < out.length; i++) {
    for (let i = 1; i < out.length; i++) {
      let prev = out[i-1];
      let current = out[i];

      let prevEnd = dayjs(prev[COL_END]);
      let currentStart = dayjs(current[COL_START]);

      let diff = currentStart.diff(prevEnd, 'minute');

      if (diff > 1) {
        console.log('Time difference between %s and %s. Inserting gap fill.', prevEnd, currentStart);

        let gap = [
          'unaccounted','empty', prevEnd.format('YYYY-MM-DD HH:mm'), currentStart.format('YYYY.MM-DD HH:mm')
        ];
        out.splice(i,0,gap);

      }

    }



  }
  return out;
}