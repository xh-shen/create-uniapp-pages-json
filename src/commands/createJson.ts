#!/usr/bin/env node
/*
 * @Author: shen
 * @Date: 2020-12-24 08:19:51
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 16:29:51
 * @Description: 
 */

import path from 'path';
import fs from 'fs';
import colors from 'colors';

const targetFile = path.resolve('pages.config.json');

if (fs.existsSync(targetFile)) {
  console.error(colors.red('File "pages.config.json" was created before.'));
} else {
  fs.copyFileSync(path.join(__dirname, '../libs/pages.config.json'), targetFile);
  console.log(colors.green('File "pages.config.json" is created now. We recommend you add it to version control.'));
}