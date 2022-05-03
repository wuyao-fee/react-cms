import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./less/login.less";
import { login_API } from "../api/login.js";

export default function Login() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const res = await login_API(values);
    message.success("登录成功,即将前往首页");
    // 本地化存储登录信息
    localStorage.setItem("username", res.username);
    localStorage.setItem("avatar", res.avatar);
    localStorage.setItem("player", res.player);
    localStorage.setItem("editable", res.editable);
    localStorage.setItem("cms-token", res["cms-token"]);
    setTimeout(() => {
      navigate("/list");
    }, 1000);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="title">登录页面</h2>
        <Form
          name="basic"
          initialValues={{ username: "react-cms-wuyao", password: "123456" }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "请输入用户名" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="请输入用户名"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "请输入密码" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请输入密码"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Link to={"/register"}>还没有账号？立即注册</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
