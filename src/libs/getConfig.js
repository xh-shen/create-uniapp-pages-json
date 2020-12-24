/*
 * @Author: shen
 * @Date: 2020-12-23 13:46:09
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 08:16:50
 * @Description: 
 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');
const defaultConfig = require('./pages.config.json');

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

  let config = require(targetFile);

  if (!config.defaultConfigFile) {
    console.warn(colors.red('You are required to provide defaultConfigFile'));
    process.exit(1);
  }

  if (!config.routeFileName) {
    console.warn(colors.red('You are required to provide routeFileName'));
    process.exit(1);
  }

  config = Object(defaultConfig, config);

  cacheConfig = config;

  return config;
}