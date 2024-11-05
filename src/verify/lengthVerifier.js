
export function isValid(input) {
  for (let i=0; i < input.length; i++){
    console.debug(input[i].length);
    if (input[i].length < 4) {
      if (i === input.length - 1 && input[i][0] === '') {
        console.debug('Ignoring newline entry at end of file.');
      } else {
        console.error('Error in input. Entries must have at least four data fields:');
        console.error(input[i]);
        return false;  
      }
    }
  }
  return true;
}