/*
 * @Author: shen
 * @Date: 2020-12-23 14:43:57
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 17:00:40
 * @Description: generater pages.json file
 */

import path from 'path';
import * as fs from 'fs';
import { Route } from './getRoutesConfig';

export interface PagesConfig {
  pages?: Route[];
  [key: string]: any;
}

export default (rootPath: string, globalPath: string, routes: Route[]): void => {
  let defaultConfig:PagesConfig = {};
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
