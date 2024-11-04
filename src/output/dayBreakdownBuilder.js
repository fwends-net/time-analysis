import { COL_LABEL } from '../common/constants.js';

/**
 * Creates a daily breakdown of number of 15 minute slots spent.
 * The list is sorted by slots.
 * @param {*} input 
 * @returns 
 */
export function getDayBreakdown(input) {

  let out = [];
  let outString = '';
  //prepare output data.
  for ( let i=0; i < input.length; i++) {
    let labelPresent = false;
    //check if the label is already in the list. if it is, increment the counter
    for (let j=0; j < out.length; j++) {
      if (out[j][0] === input[i][COL_LABEL]) {
        labelPresent = true;
        out[j][1] += 1;
      }
    }
    // label is not present, add it and set the counter to 1.
    if (!labelPresent) {
      out.push([input[i][COL_LABEL], 1]);
      labelPresent = false;
    }

  }

  //sort according to slot count

  out.sort((a,b) => {
    if (a[1] < b[1]) {
      return - 1;
    }
    if (a[1] > b[1]) {
      return 1;
    }
    return 0;
  });

  outString = '<table class=" day-breakdown uk-table-middle uk-table"><thead></thead><tbody>'
  
  //labels
  for (let i = 0;  i < out.length; i++) {
    outString += '<tr><td class="uk-table-shrink">' + out[i][0] + '</td><td><div class="container">';

    let toolTip = getDuration(out[i][1]);
    // entries per label
    for (let c = 0; c < out[i][1]; c++) {
      outString += '<div class="time-entry ' + out[i][0] + '" uk-tooltip="title:' + toolTip + '"></div>'
    }
    outString += "</div></td></tr>";

    
    
  }
  outString += "</tbody></table></td></tr>";

  return outString;

}

/**
 * Returns a String of the format [0]H:[0]m for the 
 * number of 15 minute slots provided.
 * 
 * @param {*} slotCount 
 * @returns 
 */
function getDuration(slotCount) {
  const minCount = slotCount*15;
  const hours = Math.floor(minCount / 60);
  const minutes = minCount % 60;

  let hString;
  let mString;

  if (String(hours).length < 2) {
    hString = '0' + hours;
  } else {
    hString = hours;
  }
  if (String(minutes).length < 2) {
    mString = '0' + minutes;
  } else {
    mString = minutes;
  }

  return hString + ':' + mString;

}