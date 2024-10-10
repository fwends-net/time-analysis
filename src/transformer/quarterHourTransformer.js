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
  let out = [...input];


  for (let i=0; i < out.length; i++) {
    const newStart = round(out[i][COL_START]);
    const newEnd = round(out[i][COL_END]);
    if (newStart === newEnd) {
      //if start and end are the same, the activity cannot fill at least one time bucket and will
      //therefore be removed. this will happen to time entries that are less than 15 minutes long.
      out.splice(i,1);
    } else {
      out[i][COL_START] = newStart;
      out[i][COL_END] = newEnd;  
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