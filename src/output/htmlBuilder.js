import dayjs from 'dayjs';
import { COL_LABEL, COL_TEXT, COL_START, COL_END } from '../common/constants.js';
import { buildStyles } from './styles.js';
import { writeFile } from './filewriter.js';
import config from '../common/config.js';
import { getDayBreakdown } from './dayBreakdownBuilder.js';
import { getDayTimeline } from './dayTimelineBuilder.js';


let head_start = '<html><head><meta charset="utf-8"> <meta name="viewport" content="width=device-width, initial-scale=1" />';
let head_end = '</head><body>';
let footer = '</body></html>';

/**
 * splits the input array into an array of arrays, by days.
 * note that there is no key element of the days, so if you want to
 * know which day an array is for, you need to look at the first element and
 * derive the day from the the start date of the element.
 * 
 * dayjs([4][0][COL_START]).format('YYYY-MM-DD') gives you the day
 * for all of the children of the fourth element of the output array.
 * 
 * @param {*} input 
 * @returns 
 */
function splitDays(input) {
  let out = [];
  let temp = [];
  let currentDay = undefined;
  console.log('Starting splitting of %s entries.', input.length);
  for (let i = 0; i < input.length; i++) {
        if (dayjs(input[i][COL_START]).format('YYYY-MM-DD') !== currentDay) {
      console.debug('new day');
      //push temp array into out if something is in there - we are not at the start
      if (temp.length > 0) {
        console.debug('Pushing result');
        out.push(temp);
        temp = [];
      }
      currentDay = dayjs(input[i][COL_START]).format('YYYY-MM-DD');
    } else {
      //a time entry for the current day. just push it into the result array.
      temp.push(input[i]);
    }
  }
  //finally, there is one result still dangling. add it to the result array.
  out.push(temp);
  for (let i=0; i < out.length; i++) {
    console.debug(out[i][0][COL_START]);
  }
  return out;
}





export async function buildOutput(input) {
  let out = '';

  out += head_start;
  out += "<style>";
  out += buildStyles(input);
  //out += getDefaultStyles();
  out += "</style>";
  out += '<link rel="stylesheet" href="css/uikit.min.css" />';
  out += '<link rel="stylesheet" href="style.css" />';
  out += '<script src="js/uikit.min.js"></script>';
  out += '<script src="js/uikit-icons.min.js"></script>';
  
  out += head_end;

  out += '<h1>Analysis</h1>';
  
  let days = splitDays(input);

  for (let i =0; i < days.length; i++) {
    let day = days[i];
    out += startDay();
    let dayTitle = dayjs(day[0][COL_START]).format('YYYY-MM-DD');
    out += '<td><p>' + dayTitle + '</p></td><td>';
    out += getDayTimeline(day);
    out += getDayBreakdown(day);
    out += endDay();
  }

  if (config.debug_mode) {
    out += writeCompleteDataTable(input);
  }
  

  out += footer;
  
  //return out;
  await writeFile(out);

}

function startDay() {
  return '<table class="uk-table"><tbody><tr>';
}
function endDay() {
  return '</tr></tbody></table></tr></tbody></table>';
}




function writeCompleteDataTable(input) {
  let out = '<table class="uk-table uk-table-small"><thead><tr><th>label</th><th>Description</th><th>Start</th><th>End</th></tr></thead><tbody>';
  for (let i = 0; i < input.length; i++) {
    out += '<tr><td>' + input[i][COL_LABEL] + '</td><td>' + input[i][COL_TEXT] + '</td><td>' + input[i][COL_START] + '</td><td>' + input[i][COL_END] + '</td></tr>';
  }
  out += '</tbody></table>';
  return out;
}