import { format } from "date-fns";
import BlogCategory from "./Blog/BlogCategory";

/**
 * Класс работы с блогом.
 *
 * @export
 * @class Blog
 */
export default class Blog {
  _data = {};
  _id = null;

  constructor(id, data) {
    this._data = data;
    this._id = id;
  }

  /**
   * Получение ссылки на основной банер страницы блога.
   * Временно используется для вывода в списке постов.
   *
   * @returns
   * @memberof Blog
   * @returns {string}
   */
  getBannerUrl() {
    /**
     * @type {string}
     */
    let url = this.__get_data_value__("", "");
    return url;
  }

  /**
   * Получение основного текста статьи блога в формате HTML
   *
   * @readonly
   * @memberof Blog
   * @returns {string}
   */
  getContentArticle() {
    return this.__get_data_value__("");
  }

  /**
   * Возвращает дату создания статьи блога. Преобразовывая из 'YYYY-MM-DD' => 'DD.MM.YYYY'
   *
   * @readonly
   * @memberof Blog
   * @returns {string} формат 'DD.MM.YYYY'
   */
  getCreatedAt(data_format = "dd.MM.yyyy") {
    let createdAt = this.__get_data_value__("");

    if (createdAt) {
      createdAt = format(new Date(createdAt), data_format);
    }

    return createdAt;
  }

  /**
   * Возвращает описание страницы статьи для тега <meta name="description" content=""/>
   *
   * @readonly
   * @memberof Blog
   * @returns {string}
   */
  getDescription() {
    return this.__get_data_value__("");
  }

  /**
   * Признак активности статьи
   *
   * @returns
   * @memberof Blog
   * @returns {boolean}
   */
  getEnabled() {
    return this.__get_data_value__("", true);
  }

  /**
   * Возвращает заголовок статьи
   *
   * @readonly
   * @memberof Blog
   * @returns {string}
   */
  getH1() {
    return this.__get_data_value__("");
  }

  /**
   *
   *
   * @readonly
   * @memberof Blog
   * @returns {number}
   */
  getId() {
    return this._id;
  }

  /**
   * Короткий текст статьи
   *
   * @returns
   * @memberof Blog
   * @returns {string}
   */
  getPreviewText() {
    return this.__get_data_value__("");
  }

  /**
   * Возвращает заголовок страницы статьи для тега <title></title>
   *
   * @returns
   * @memberof Blog
   * @returns {string}
   */
  getTitle() {
    return this.__get_data_value__("");
  }

  /**
   *
   *
   * @returns
   * @memberof Blog
   * @returns {string}
   */
  getUrn() {
    return "";
  }

  /**
   *
   *
   * @returns
   * @memberof Blog
   * @returns {BlogCategory}
   */
  getCategory() {
    const category = this.__get_data_value__("", {});
    return new BlogCategory(category.id, category);
  }

  /**
   * Возвращает значение из внутреннего массива данных
   * @param {string} $key
   * @param {any} $default
   * @return {any}
   */
  __get_data_value__($key, $default = null) {
    return this._data[$key] ? this._data[$key] : $default;
  }
}
