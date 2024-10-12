import { COL_LABEL } from '../common/constants.js';
//TODO this should actually come from some sort of config file?
const colors = {
  work:'#D61244',
  personal: '#FE8BDF',
  sleep:'#866650',
  nap:'#59153B',
  household:'#04EBEF',
  family:'#16935E',
  sport:'#6680E8',
  unaccounted: '#CCCCCC',
};

const reserve = [
  '#BA192E',
  '#F8D053',
  '#8DBD88',
  '#526803',
  '#B83005'

];
const COLOR_DEFAULT = '#ffffff';
export function buildStyles(input) {
  //collect all labels from the input
  let labels = input.map(entry => {
    return entry[COL_LABEL];
  });
  //make them unique
  labels = labels.filter((value, index, array) => array.indexOf(value) === index);

  let label_styles = [];
  let idx = 0;
  for (let i=0; i < labels.length; i++) {
    if (colors[labels[i]]) {
      label_styles.push({
        label: labels[i], color: colors[labels[i]]
      })
    } else {
      //if the idx is out of bounds best is to go with white?
      if (idx < reserve.length) {
        label_styles.push({
          label: labels[i], color: reserve[idx]
        });
        idx++;
      } else {
        label_styles.push({
          label: labels[i], color: COLOR_DEFAULT
        });
      }
    }
  }

  let labelStylesStr = '';
  for (let i=0; i < label_styles.length; i++) {
    labelStylesStr += 'td.' + label_styles[i].label + ' {background-color: ' + label_styles[i].color + ';} '
  }
  return labelStylesStr;
}

/**
 * Returns some default styles.
 * @returns 
 */
export function getDefaultStyles() {
  let ret = '';
  ret += 'body {font-family: Helvetica Neue, Helvetica, Arial, sans-serif}';
  ret += 'td {width: 20px;height: 20px;border: 1px black solid}';
  return ret;
}