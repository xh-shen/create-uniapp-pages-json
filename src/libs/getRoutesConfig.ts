/*
 * @Author: shen
 * @Date: 2020-12-23 13:57:27
 * @LastEditors: shen
 * @LastEditTime: 2020-12-24 16:55:22
 * @Description: get module router config
 */

export interface Route {
  path: string;
  style?: any;
  [key: string]: string;
}

export default (routesPath: string[]) : Route[] => {
  let routes:Route[] = []
  routesPath.forEach(fullPath => {
    delete require.cache[require.resolve(fullPath)];
    const config = require(fullPath);
    routes.push(...config)
  })
  const rootRouteIndex = routes.findIndex(route => route.isRoot);
  if(rootRouteIndex > -1) {
    const rootRoute = routes[rootRouteIndex];
    routes.splice(rootRouteIndex, 1);
    routes.unshift(rootRoute)
  }
  return routes.map(({path, style = {}}) => ({path: path.indexOf('/') === 0 ? path.substr(1) : path, style}))
}
