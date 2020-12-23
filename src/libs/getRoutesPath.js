/*
 * @Author: shen
 * @Date: 2020-12-23 14:01:13
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 14:37:53
 * @Description: 
 */

const path = require('path');
const fs = require('fs');
const colors = require('colors');


const deepFindRoutes = (modulePath, routeFileName) => {
  const routesPath = [];
  const fn = (modulePath) => {
    const modules = fs.readdirSync(modulePath);
    modules.forEach(module => {
      const moduleDir = path.join(modulePath,module);
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

module.exports = (config) => {
  const modulePath = path.resolve(config.modulePath);
  const routesPath = deepFindRoutes(modulePath, config.routeFileName);
  return routesPath;
}
