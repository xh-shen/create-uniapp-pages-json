/*
 * @Author: shen
 * @Date: 2020-12-23 13:57:27
 * @LastEditors: shen
 * @LastEditTime: 2020-12-23 14:41:02
 * @Description: get module router config
 */

module.exports = routesPath => {
  let routes = []
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
