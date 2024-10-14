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

  let firstEntry = out[0];
  let startOfDay = dayjs(firstEntry[COL_START]).startOf("day");
  
  // fill up any gap to the start of the day for the first day of time recording
  if (!dayjs(firstEntry[COL_START]).isSame(startOfDay)) {
    out.splice(0, 0, [
      "unaccounted",
      "empty",
      startOfDay.format("YYYY-MM-DD HH:mm"),
      firstEntry[COL_START],
    ]);
  }

  for (let i = 1; i < out.length; i++) {
    let prev = out[i - 1];
    let current = out[i];

    let prevEnd = dayjs(prev[COL_END]);
    let currentStart = dayjs(current[COL_START]);

    let diff = currentStart.diff(prevEnd, "minute");

    if (diff > 0) {
      console.debug(
        "Time difference between %s and %s. Inserting gap fill.",
        prevEnd,
        currentStart
      );

      let gap = [
        "unaccounted",
        "empty",
        prevEnd.format("YYYY-MM-DD HH:mm"),
        currentStart.format("YYYY.MM-DD HH:mm"),
      ];
      out.splice(i, 0, gap);
    }
  }

  // fill any gap to the end of the day after the last time recording
  let lastEntry = out[out.length - 1];
  let endOfDay = dayjs(lastEntry[COL_END]).endOf("day");
  if (!dayjs(lastEntry[COL_END]).isSame(endOfDay)) {
    out.splice(out.length - 1, 0, [
      "unaccounted",
      "empty",
      lastEntry[COL_END],
      endOfDay.format("YYYY-MM-DD HH:mm"),
    ]);
  }

  return out;
}
