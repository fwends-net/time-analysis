
export function isValid(input) {
  for (let i=0; i < input.length; i++){
    if (input[i].length < 4) {
      console.error('Error in input. Entries must have at least four data fields:');
      console.error(input[i]);
      return false;
    }
  }
  return true;
}