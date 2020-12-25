/*
 * @Author: shen
 * @Date: 2020-12-23 15:01:26
 * @LastEditors: shen
 * @LastEditTime: 2020-12-25 08:18:06
 * @Description: 
 */
import path from 'path';
import getConfig, { Config } from '../libs/getConfig';
import getRoutesPath from '../libs/getRoutesPath';
import getRoutesConfig, { Route } from '../libs/getRoutesConfig';
import generatePagesJson from '../libs/generatePagesJson';

const config: Config = getConfig();
const defaultConfigPath: string = path.resolve(config.defaultConfigFile);

export default class WatchUniAppRoutesPlugin {
  apply(compiler) {
    compiler.hooks.afterCompile.tap('WatchUniAppRoutesPlugin', compilation => {
      compilation.fileDependencies.add(defaultConfigPath);
    })
    compiler.hooks.watchRun.tapAsync('WatchUniAppRoutesPlugin', (compiler, cb) => {
      const changedFiles: string[] = Object.keys(compiler.watchFileSystem.watcher.mtimes);
      if(changedFiles.length) {
        const routesPath: string[] = getRoutesPath(config);
        const isChange: boolean = routesPath.some(item => changedFiles.includes(item));
        if(isChange || changedFiles.includes(defaultConfigPath)) {
          const routesConfig: Route[]  = getRoutesConfig(routesPath);
          generatePagesJson(config.rootPath, config.defaultConfigFile, routesConfig);
        }
      }
      cb();
    });
  }
}