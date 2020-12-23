/*
 * @Author: shen
 * @Date: 2020-12-23 14:43:57
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 14:59:32
 * @Description: generater pages.json file
 */

const path = require('path')
const fs = require('fs')

 module.exports = (rootPath, globalPath, routes) => {
  let defaultConfig = {};
  const pagesPath = path.resolve(rootPath, 'pages.json');
  const defaultConfigPath = path.resolve(globalPath);
  if (fs.existsSync(defaultConfigPath)) {
    delete require.cache[require.resolve(defaultConfigPath)];
    defaultConfig = require(defaultConfigPath);
  }
  fs.existsSync(pagesPath) && fs.unlinkSync(pagesPath);

  const content = JSON.stringify({
    ...defaultConfig,
    pages: defaultConfig.pages ? defaultConfig.pages.concat(routes) : routes,
  }, null, 2)
  fs.writeFileSync(pagesPath, content, 'utf8');
 }
