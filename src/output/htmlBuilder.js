let head_start = '<html><head><meta charset="utf-8">';
let head_end = '</head><body>';
let footer = '</body></html>';

import { writeFile } from './filewriter.js';
import { COL_LABEL, COL_TEXT, COL_START, COL_END } from '../common/constants.js';
import dayjs from 'dayjs';
import { buildStyles, getDefaultStyles } from './styles.js';
import config from '../common/config.js';
export async function buildOutput(input) {
  let out = '';

  out += head_start;
  out += "<style>";
  out += buildStyles(input);
  out += getDefaultStyles();
  out += "</style>";
  out += head_end;


  out += '<table><tbody><tr>';
  
  let day = dayjs(input[0][COL_START]);
  out += startDay();
  out += '<td><h2>' + day.format('YYYY-MM-DD') + '</h2></td><td><table><tbody><tr>';
  

  for (let i=0; i < input.length; i++) {
    if (!dayjs(input[i][COL_START]).isSame(day, 'day')) {
      out +=endDay();
      day = dayjs(input[i][COL_START]);
      out+=startDay();
      out += '<td><h2>' + day.format('YYYY-MM-DD') + '</h2></td><td><table><tbody><tr>';
      
    }
    out += buildEntry(input[i], i);
  }
  out += endDay();

  out += writeCompleteDataTable(input);

  out += footer;
  
  //return out;
  await writeFile(out);

}

function startDay() {
  return '<table><tbody><tr>';
}
function endDay() {
  return '</tr></tbody></table></tr></tbody></table>';
}


function buildEntry(entry, count) {
  const text = config.debug_mode ?  dayjs(entry[COL_START]).format('HH:mm') + '-' + dayjs(entry[COL_END]).format('HH:mm') + ' (' + count +')' : '';
  return '<td class="' + entry[COL_LABEL] + '" title="' + buildTitle(entry) +  '">' + text + '</td>';
}

function buildTitle(entry) {
  let out = '';
  out = dayjs(entry[COL_START]).format('HH:mm') + '-' + dayjs(entry[COL_END]).format('HH:mm') + ': ';
  out += entry[COL_LABEL] + ':' + entry[COL_TEXT];
  return out;
}


function writeCompleteDataTable(input) {
  let out = '<table><thead><tr><th>label</th><th>Description</th><th>Start</th><th>End</th></tr></thead><tbody>';
  for (let i = 0; i < input.length; i++) {
    out += '<tr><td>' + input[i][COL_LABEL] + '</td><td>' + input[i][COL_TEXT] + '</td><td>' + input[i][COL_START] + '</td><td>' + input[i][COL_END] + '</td></tr>';
  }
  out += '</tbody></table>';
  return out;
}