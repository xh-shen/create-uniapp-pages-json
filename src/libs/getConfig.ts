/*
 * @Author: shen
 * @Date: 2020-12-23 13:46:09
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 16:55:02
 * @Description: 
 */
import path from 'path';
import * as fs from 'fs'
import colors from 'colors';
import defaultConfig from './pages.config.json';

export interface Config {
  rootPath: string;
  modulePath: string;
  defaultConfigFile: string;
  routeFileName: string;
}

let cacheConfig: Config;

export default () : Config => {
  if (cacheConfig) {
    return cacheConfig;
  }

  const targetFile = path.resolve('pages.config.json');

  if (!fs.existsSync(targetFile)) {
    console.warn(colors.red('File "pages.config.json" doesn\'t exist, did you forget to generate it?'));
    process.exit(1);
  }

  let config = require(targetFile)  as Config;

  if (!config.defaultConfigFile) {
    console.warn(colors.red('You are required to provide defaultConfigFile'));
    process.exit(1);
  }

  if (!config.routeFileName) {
    console.warn(colors.red('You are required to provide routeFileName'));
    process.exit(1);
  }

  config = Object.assign(defaultConfig, config);

  cacheConfig = config;

  return config;
}