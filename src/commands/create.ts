#!/usr/bin/env node
/*
 * @Author: shen
 * @Date: 2020-12-23 10:56:46
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 16:28:45
 * @Description: 
 */

"use strict";
import { promisify } from 'util';
import figlet from 'figlet';
import chalk from 'chalk';
import getConfig from '../libs/getConfig';
import getRoutesPath from '../libs/getRoutesPath';
import getRoutesConfig from '../libs/getRoutesConfig';
import generatePagesJson from '../libs/generatePagesJson';

const figletPromisify = promisify(figlet);

const log = content => console.log(chalk.green(content));

(async function() {
  const data = await figletPromisify('shen');
  log(data)
  const config = getConfig();
  const ora = require('ora')
  const process = ora(`pages.json文件生成中...`)
  process.start()
  const routesPath = getRoutesPath(config);
  const routesConfig = getRoutesConfig(routesPath);
  generatePagesJson(config.rootPath, config.defaultConfigFile, routesConfig);
  setTimeout(() => {
    process.succeed()
  }, 1000)
})()



