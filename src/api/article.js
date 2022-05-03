import request from "../utils/request.js";

/**
 * 获取文章列表
 * @param {*} num   当前页码
 * @param {*} count 每页容量
 * @returns
 */
export async function getArticleList_API(num, count) {
  return await request({
    url: "/article",
    method: "get",
    params: {
      num,
      count
    }
  });
}

/**
 * 添加文章
 * @param {*} data
 * @returns
 */
export async function addArticle_API(data) {
  return await request({
    url: "/article/add",
    method: "post",
    data
  });
}

/**
 * 通过文章id获取文章信息
 * @param {*} id 文章id
 * @returns
 */
export async function getArticleById_API(id) {
  return await request({
    url: `/article/${id}`,
    method: "get"
  });
}

/**
 * 修改文章
 * @param {*} data
 * @returns
 */
export async function updateArticle_API(data) {
  return await request({
    url: "/article/update",
    method: "put",
    data
  });
}

/**
 * 通过文章id删除文章
 * @param {*} id 文章id
 * @returns
 */
export async function removeArticleById_API(data) {
  return await request({
    url: "/article/remove",
    method: "post",
    data
  });
}
