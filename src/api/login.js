import request from "../utils/request.js";

/**
 * 用户登录
 * @param {*} username
 * @param {*} password
 * @returns
 */
export async function login_API(data) {
  return await request({
    url: "/login",
    method: "post",
    data
  });
}
