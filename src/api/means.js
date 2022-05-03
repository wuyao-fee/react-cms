import request from "../utils/request.js";

/**
 * 获取用户资料
 * @returns
 */
export async function getUserInfo_API() {
  return await request({
    url: "/info",
    method: "get"
  });
}

/**
 * 修改用户资料
 * @param {*} data
 * @returns
 */
export async function updateUserInfo_API(data) {
  return await request({
    url: "/info",
    method: "put",
    data
  });
}
