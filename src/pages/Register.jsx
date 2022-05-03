import React from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./less/login.less";
import { register_API } from "../api/register.js";

export default function Register() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    await register_API(values);
    message.success("用户注册成功");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="title">注册页面</h2>
        <Form
          name="basic"
          initialValues={{ remember: true }}
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

          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "请再次确认密码"
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("请填写相同密码"));
                }
              })
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              placeholder="请再次确认密码"
              size="large"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Link to={"/login"}>已有账号？前往登录</Link>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block size="large">
              立即注册
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
