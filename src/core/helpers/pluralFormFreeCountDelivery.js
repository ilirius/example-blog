/**
 * Получение склонения количества городов
 * @param {number} count кол-во городов
 * @returns {string} count + склонение город||города||городов
 */
export const pluralFormFreeCountDelivery = count => {
  var number = +count.toString().slice(-1);
  var result = "а";

  if (1 < number && number <= 4) {
    result = "а";
  } else {
    result = "ов";
  }

  return result;
};
