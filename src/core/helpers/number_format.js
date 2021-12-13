/**
 *
 * @description Разбивает число на триады
 *
 * @param {String} x
 * @return {String}
 */
export const numberWithSpaces = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

// /**
//  * @description Форматирование числа. Разделение на сотни, десятки, тысячи
//  * @return {string}
//  */
// Number.prototype.numberWithSpaces = () => this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
