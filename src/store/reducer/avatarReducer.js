/* eslint-disable import/no-anonymous-default-export */
import { actionTypes } from "../action/avatarAction";
import defaultAvatar from "../../assets/avatar/defaultAvatar.gif";

const initialState = localStorage.getItem("avatar") || defaultAvatar;

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case actionTypes.SETAVATAR:
      return payload;
    default:
      return state;
  }
}
