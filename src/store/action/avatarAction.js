export const actionTypes = {
  SETAVATAR: Symbol("set-avatar")
};

/**
 * 设置avatar的action创建函数
 * @param {String} payload 头像地址
 * @returns
 */
export const createSetAvatarAction = (payload) => ({
  type: actionTypes.SETAVATAR,
  payload
});
