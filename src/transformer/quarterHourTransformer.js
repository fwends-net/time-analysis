
/**
 * Splits time entries from input into 15 minute intervals.
 * These intervals start at 0, 15, 30 or 45 minutes after the hour.
 * 
 * If an entry fills out more than half of this specific interval, the complete
 * interval gets assigned to the entry.
 * 
 * For example, the entry 14.07 - 14.30 will get the intervals 14.00, 14.15
 * But the entry 14.08 - 14.30 will only the the interval 14.15, with the
 * interval 14.00 granted to its predecessor.
 * 
 * @param {*} input 
 * @returns 
 */
export function transform(input) {
  let out = [...input];

  return out;
}