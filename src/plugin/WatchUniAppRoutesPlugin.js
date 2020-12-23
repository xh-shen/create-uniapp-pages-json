/*
 * @Author: shen
 * @Date: 2020-12-23 15:01:26
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 16:30:32
 * @Description: 
 */

const path = require('path')
const getConfig = require('../libs/getConfig');
const getRoutesPath = require('../libs/getRoutesPath');
const getRoutesConfig = require('../libs/getRoutesConfig');
const generatePagesJson = require('../libs/generatePagesJson');

const config = getConfig();

class WatchUniAppRoutesPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap('WatchUniAppRoutesPlugin', compilation => {
      const defaultConfigPath = path.resolve(config.defaultConfigFile);
      compilation.fileDependencies.add(defaultConfigPath);
    })
    compiler.hooks.watchRun.tapAsync('WatchUniAppRoutesPlugin', (compiler, cb) => {
      const changedFiles = Object.keys(compiler.watchFileSystem.watcher.mtimes);
      if(changedFiles.length) {
        const routesPath = getRoutesPath(config);
        const defaultConfigPath = path.resolve(config.defaultConfigFile);
        const isChange = routesPath.some(item => changedFiles.includes(item));
        if(isChange || changedFiles.includes(defaultConfigPath)) {
          const routesConfig = getRoutesConfig(routesPath);
          generatePagesJson(config.rootPath, config.defaultConfigFile, routesConfig);
        }
      }
      cb();
    });
  }
}

module.exports = WatchUniAppRoutesPlugin;