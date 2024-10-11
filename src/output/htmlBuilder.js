let head = '<html><head><link rel="stylesheet" href="style.css"></head><body>';
let footer = '</body></html>';

import { writeFile } from './filewriter.js';
import { COL_LABEL, COL_TEXT, COL_START, COL_END } from '../common/constants.js';

export async function buildOutput(input) {
  let out = '';

  out += head;

  out += '<table><tbody><tr>';
  
  for (let i=0; i < input.length; i++) {
    out += buildEntry(input[i]);
  }
  out += '</tr></tbody></table>';

  out += writeCompleteDataTable(input);

  out += footer;
  
  //return out;
  await writeFile(out);

}

function buildEntry(entry) {
  return '<td class="' + entry[COL_LABEL] + '">' + '</td>';
}

function writeCompleteDataTable(input) {
  let out = '<table><thead><tr><th>label</th><th>Description</th><th>Start</th><th>End</th></tr></thead><tbody>';
  for (let i = 0; i < input.length; i++) {
    out += '<tr><td>' + input[i][COL_LABEL] + '</td><td>' + input[i][COL_TEXT] + '</td><td>' + input[i][COL_START] + '</td><td>' + input[i][COL_END] + '</td></tr>';
  }
  out += '</tbody></table>';
  return out;
}