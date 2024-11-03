import { COL_LABEL, COL_TEXT, COL_START, COL_END } from '../common/constants.js';
import config from '../common/config.js';
import dayjs from 'dayjs';

/**
 * Creates the daily timeline of 15 minute slots.
 * @param {*} input 
 * @returns 
 */
export function getDayTimeline(input) {
  let out = '<table class="uk-table"><tbody><tr>';
  for (let i=0; i < input.length; i++) {
    out += buildEntry(input[i],i);
  }
  out += '</tr></tbody></table>';
  return out;
}

/**
 * Create the 15 minute slot representation. The 'count' parameter is only used when in debug mode.
 * 
 * @param {*} entry 
 * @param {*} count 
 * @returns 
 */
function buildEntry(entry, count) {
  const text = config.debug_mode ?  dayjs(entry[COL_START]).format('HH:mm') + '-' + dayjs(entry[COL_END]).format('HH:mm') + ' (' + count +')' : '';
  //return '<td class="' + entry[COL_LABEL] + '" uk-tooltip="title: ' + buildTitle(entry) +  '">' + text + '</td>';

  return '<div class="time-entry ' + entry[COL_LABEL] + '"' + '" uk-tooltip="title: ' + buildTitle(entry) +  '">' + text + '</div>';

}

function buildTitle(entry) {
  let out = '';
  out = dayjs(entry[COL_START]).format('HH:mm') + '-' + dayjs(entry[COL_END]).format('HH:mm') + ': ';
  out += entry[COL_LABEL] + ':' + entry[COL_TEXT];
  return out;
}