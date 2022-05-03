import React from "react";
import "./pages/less/app.less";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Headers from "./components/Header";
import Asider from "./components/Sider";
import Bread from "./components/Bread";
const { Content, Footer } = Layout;

export default function App() {
  return (
    <Layout className="app-container">
      <Asider />
      <Layout>
        <Headers />
        <Content className="content-container">
          <Bread />
          <Outlet />
        </Content>
        <Footer className="footer-container">
          Respect | Copyright &copy; 2022 Author wuyao
        </Footer>
      </Layout>
    </Layout>
  );
}
