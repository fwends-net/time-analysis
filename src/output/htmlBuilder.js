let head = '<html><head></head><body>';
let footer = '</body></html>';



export function buildOutput(input) {
  let out = '';

  out += head;

  out += '<table><tbody><tr>';
  
  for (let i=0; i < input.length; i++) {
    out += buildEntry(entry);
  }
  out += '</tr></tbody></table>';
  out += footer;
  
  return out;

}

function buildEntry(entry) {
  return '<td class="' + entry[COL_LABEL] + '"/>';
}