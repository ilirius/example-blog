/**
 *
 * @description Собирает из объекта get-строку
 *
 * @param {Object} object
 * @return {String}
 */
export function makeUrl(object) {
  var out = new Array(Object.keys(object).length),
    i = 0;

  for (var key in object) {
    out[i] = key + "=" + encodeURIComponent(object[key]);
    i++;
  }

  return out.join("&");
}
