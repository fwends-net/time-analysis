import  { OUTFILE } from './common/constants.js';
import config from './common/config.js';
import { parse } from './input/parser.js';

async function start() {

  if (! config.debug_mode) {
    // it's hard to believe, but apparently this is the way to turn off debug logging
    // in javascript ...
    console.debug = function() {};
  }
  console.debug('Starting analysis');
  console.debug('Output file is %s.', OUTFILE);
  await parse();
  console.debug('Main function ends here. Have a great day!');
}

start();