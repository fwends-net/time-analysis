import  { INPATH, OUTFILE } from './common/constants.js';

import { parse } from './input/parser.js';

async function start() {

  console.log('Starting analysis');
  console.log('Output file is %s.', OUTFILE);

  await parse();

}

start();