import avatarReducer from "./avatarReducer";
import { combineReducers } from "redux";

export default combineReducers({
  avatar: avatarReducer
});
