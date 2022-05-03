import axios from "axios";
import { message } from "antd";

// 创建实例
const instance = axios.create({
  baseURL: "/manage",
  timeout: 3000
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("cms-token");
    if (token) {
      config.headers["cms-token"] = token;
    }
    console.log(config, "请求");
    return config;
  },
  (error) => {
    message.error(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    console.log(response, "响应");
    if (!(response.data.errCode === 0)) {
      message.error(response.data.message);
      return Promise.reject(response.data.message);
    }
    return response.data.data;
  },
  (error) => {
    message.error(error);
    return Promise.reject(error);
  }
);

// 导出实例
export default instance;
