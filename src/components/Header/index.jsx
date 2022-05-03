import React, { useState, useEffect } from "react";
import "./index.less";
import store from "../../store";
import { createSetAvatarAction } from "../../store/action/avatarAction";
import defaultAvatar from "../../assets/avatar/defaultAvatar.gif";
import { Menu, Dropdown, Space, message, Layout } from "antd";
import { CaretDownOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../utils/urlConfig.js";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

export default function Headers() {
  const navigate = useNavigate();
  const [avatar, setAvatar] = useState(
    `${SERVER_URL}${store.getState().avatar}`
  );
  const [username, setUsername] = useState("游客");

  // 生命周期函数
  useEffect(() => {
    let localUsername = localStorage.getItem("username");
    if (localUsername) {
      setUsername(localUsername);
    }
    // 监听store仓库中avatar的改变
    store.subscribe(() => {
      // console.log(store.getState().avatar, "状态改变了");
      setAvatar(`${SERVER_URL}${store.getState().avatar}`);
    });
  }, [avatar]);

  // 退出登录
  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("avatar");
    localStorage.removeItem("player");
    localStorage.removeItem("cms-token");
    localStorage.removeItem("editable");
    message.success("退出成功,即将返回登录页");
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  const menu = (
    <Menu
      items={[
        {
          label: "修改资料",
          key: 1
        },
        {
          type: "divider"
        },
        {
          label: "退出登录",
          key: 2,
          onClick: () => logout()
        }
      ]}
    />
  );

  return (
    <Header
      className="header-container"
      style={{ backgroundColor: "aquamarine" }}
    >
      <div className="top-right">
        <img src={avatar} alt="" className="avatar" />
        <Dropdown overlay={menu}>
          <a onClick={(e) => e.preventDefault()} className="ant-dropdown-link">
            <Space>
              <span className="username">欢迎{username}</span>
              <CaretDownOutlined />
            </Space>
          </a>
        </Dropdown>
      </div>
    </Header>
  );
}
