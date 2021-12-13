import axios from "axios";

/** Получение списка доступных статей блока
 * 
 * @param {number} page текущая страница статей блога
 */
export const getBlogPosts = (page = 1) => {}

/**
 * Получение списка категорий к которым относиться статься блога
 */
export const getBlogPostsCategories = () => {}

/**
 * Получение списка статей блога по выбранной категории и номеруи страницы
 * 
 * @param {number} page текущая страница статей блога
 * @param {String} category категория по которой будет отфильтрован список статей блога
 */
export const getBlogPostsByFilterCategories = ({ page, category }) =>{}
