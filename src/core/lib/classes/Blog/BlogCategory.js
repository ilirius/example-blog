export default class BlogCategory {
  _data = {};
  _id = 0;
  constructor(id, data) {
    this._id = id;
    this._data = data;
  }

  getId() {
    return this._id;
  }

  getLabel() {
    return this.__get_data_value__("label");
  }

  getUrn() {
    return this.__get_data_value__("urn");
  }

  getDescription() {
    return this.__get_data_value__("description");
  }

  /**
   *
   *
   * @returns
   * @memberof BlogCategory
   */
  getPostsCount() {
    return this.__get_data_value__("postsCount");
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
