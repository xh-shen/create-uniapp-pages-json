/*
 * @Author: shen
 * @Date: 2020-12-23 14:01:13
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 16:54:42
 * @Description: 
 */

import path from 'path';
import * as fs from 'fs'
import { Config } from './getConfig'


const deepFindRoutes = (modulePath: string, routeFileName: string): string[] => {
  const routesPath:string[] = [];
  const fn = (modulePath) => {
    const modules = fs.readdirSync(modulePath);
    modules.forEach(module => {
      const moduleDir = path.join(modulePath, module);
      const statInfo = fs.statSync(moduleDir);
      const isDir = statInfo.isDirectory();
      if (isDir) {
        fn(moduleDir)
      } else {
        module === routeFileName && routesPath.push(moduleDir)
      }
    })
  }
  fn(modulePath)
  return routesPath;
}

export default ({ modulePath, routeFileName }: Config): string[]  => {
  const moduleFullPath = path.resolve(modulePath);
  const routesPath = deepFindRoutes(moduleFullPath, routeFileName);
  return routesPath;
}
