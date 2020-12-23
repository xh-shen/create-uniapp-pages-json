/*
 * @Author: shen
 * @Date: 2020-12-23 13:46:09
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 14:05:37
 * @Description: 
 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');

let cacheConfig;

module.exports = () => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('pages.config.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('File "pages.config.json" doesn\'t exist, did you forget to generate it?'));
    process.exit(1);
  }

  const config = require(targetFile);

  cacheConfig = config;

  return config;
}