import dayjs from "dayjs";
import {COL_START,COL_END}  from '../common/constants.js';
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
  let out = [];


  for (let i=0; i < input.length; i++) {
    const newStart = round(input[i][COL_START]);
    const newEnd = round(input[i][COL_END]);
    if (newStart !== newEnd) {
      //if start and end are the same, the activity cannot fill at least one time bucket and will
      //therefore be removed. this will happen to time entries that are less than 15 minutes long.
      //console.log('Removing entry with 0 duration after rounding');
      //out.splice(i,1);
      let temp = [...input[i]];
      temp[COL_START] = newStart;
      temp[COL_END] = newEnd;  
      out.push(temp);
   
    }
  }

  return out;
}

/**
 * Rounds the date to the nearest quarter hour (0, 15, 30, 45)
 * @param {*} date 
 * @returns 
 */
function round(date) {
  const minute = dayjs(date).get('minute');
  let val = 0;
  if (minute < 8) {
    val = 0;
  }
 else if (minute < 23) {
    val = 15;
  }
  else if (minute < 38) {
    val = 30;
  }
  else if (minute < 53) {
    val = 45;
  }
  else if (minute > 52) {
    val = 60;
  }
  console.log('Round result: %s becomes %s', minute, val);
  return dayjs(date).set('minute', val).format('YYYY-MM-DD HH:mm');

}
/*
this is likely not needed at all.
function createTimeBuckets(day) {
  let buckets = [];

  const startOfDay = dayjs(day).set('hour',0).set('minute',0).set('second',0);
  const endOfDay = dayjs(day).set('hour',23).set('minute',59).set('second',59);
  console.log('JEY');
  console.log(day);
  let currTime = startOfDay;
  console.log(startOfDay.format('YYYY-MM-DD HH:mm'));
  console.log(endOfDay.format('YYYY-MM-DD HH:mm'));
  while (currTime.isBefore(endOfDay)) {
    console.log('yes');
    let bucketEnd = currTime.add(15, 'minutes');
    buckets.push([currTime.format('YYYY-MM-DD HH:mm'), bucketEnd.format('YYYY-MM-DD HH:mm')]);
    currTime = bucketEnd;
  }
  console.log(buckets.length);
  return buckets;

}*/