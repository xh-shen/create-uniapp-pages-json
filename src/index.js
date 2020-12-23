#!/usr/bin/env node
/*
 * @Author: shen
 * @Date: 2020-12-23 10:56:46
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 13:22:13
 * @Description: 
 */

"use strict";

const program = require("commander");
const appInfo = require("../package.json");

program.allowUnknownOption();
program.version(appInfo.version);

program
  .command("init")
  .description("初始化当前目录module.config.json文件")
  .action(() => initAction());

program.command("*").action((env) => {
  console.error('不存在命令 "%s"', env);
});

program.parse(process.argv);

console.log('hello world111')
