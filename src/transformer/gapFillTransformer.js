
/**
 * Will fill any existing gaps in the input array with an "unaccounted" labelled entry.
 * It assumes that the input array is sorted.
 * 
 * @param {*} input 
 */
export function transform(input) {
  let out = [...input];
  for (let i=1; i < out.length; i++) {
    //TODO
    //we will reset seconds to 0.
    //if the difference between i and i-1 is more than a minute, we will insert an unaccounted entry
  }
  return out;
}