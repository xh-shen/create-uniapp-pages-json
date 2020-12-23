#!/usr/bin/env node
/*
 * @Author: shen
 * @Date: 2020-12-23 10:56:46
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 15:46:07
 * @Description: 
 */

"use strict";
const { promisify } = require('util');
const figlet = promisify(require('figlet'));
const chalk = require('chalk');
const getConfig = require('../libs/getConfig');
const getRoutesPath = require('../libs/getRoutesPath');
const getRoutesConfig = require('../libs/getRoutesConfig');
const generatePagesJson = require('../libs/generatePagesJson');

const log = content => console.log(chalk.green(content));

(async function() {
  const data = await figlet('shen');
  log(data)
  const ora = require('ora')
  const process = ora(`pages.json文件生成中...`)
  process.start()
  const config = getConfig();
  const routesPath = getRoutesPath(config);
  const routesConfig = getRoutesConfig(routesPath);
  generatePagesJson(config.rootPath, config.defaultConfigFile, routesConfig);
  setTimeout(() => {
    process.succeed()
  }, 1000)
})()



