import React, { useEffect, useState } from "react";
import "./index.less";
import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
const { Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

const items = [
  getItem("文章列表", "list", <PieChartOutlined />),
  getItem("编辑文章", "edit", <DesktopOutlined />),
  getItem("修改资料", "means", <ContainerOutlined />)
];

export default function Asider() {
  const navigate = useNavigate();
  const location = useLocation();
  const [defaultKey, setDefaultKey] = useState("");

  useEffect(() => {
    const key = location.pathname.split("/")[1];
    setDefaultKey(key);
    // console.log(path, "location");
  }, [location.pathname]);

  // 处理菜单项的点击事件
  const handleClick = (e) => {
    navigate(`/${e.key}`);
    setDefaultKey(e.key);
  };

  return (
    <Sider className="aside-container">
      <Menu
        className="aside"
        style={{ width: 200 }}
        selectedKeys={[defaultKey]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={handleClick}
      />
    </Sider>
  );
}
