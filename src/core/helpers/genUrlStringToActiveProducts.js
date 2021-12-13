/**
 *
 * @param {Object} products
 * @returns {string[]}
 */
export function genUrlStringToActiveProducts(products) {
  let actionsIds = Object.keys(products)
    .filter(key => products[key].active)
    .reduce((res, key) => [...res, `activeIds[]=${key}`], []);

  if (actionsIds.length === 0) {
    actionsIds = ["activeIds[]="];
  }

  return actionsIds.join("&");
}
