import request from "../utils/request.js";

/**
 * 用户注册
 * @param {*} username
 * @param {*} password
 * @returns
 */
export async function register_API(data) {
  return await request({
    url: "/register",
    method: "post",
    data
  });
}
