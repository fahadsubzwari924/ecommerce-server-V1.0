'use strict';

import {readFileSync} from 'fs';
import {parse} from 'ini';

let config = parse(readFileSync(`${__dirname}/config.ini`, 'utf-8'));
export default config;