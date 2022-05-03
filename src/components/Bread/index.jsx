import React, { useEffect, useState } from "react";
import { Breadcrumb } from "antd";
import "./index.less";
import { useLocation } from "react-router-dom";

// 面包屑信息列表
const breadList = [
  { path: "/list", name: "文章列表" },
  { path: "/edit", name: "编辑文章" },
  { path: "/means", name: "修改资料" }
];
// 面包屑路径数组
const breadPathArr = ["/list", "/edit", "/means"];

export default function Bread() {
  const { pathname } = useLocation();
  const [breadName, setBreadName] = useState("");

  useEffect(() => {
    const index = breadPathArr.indexOf(pathname);
    const editidReg = /^\/edit\/[0-9]{1,}/;
    const isEditId = editidReg.test(pathname);
    if (index !== -1) {
      setBreadName(breadList[index].name);
    }
    if (isEditId) {
      setBreadName(breadList[1].name);
    }
  }, [pathname]);

  return (
    <div className="bread-container">
      <Breadcrumb>
        <Breadcrumb.Item>
          <a href="/">首页</a>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
}
