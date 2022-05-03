import React, { useEffect, useState } from "react";
import { Table, Space, Button, message, Modal } from "antd";
import { getArticleList_API, removeArticleById_API } from "../api/article.js";
import "./less/list.less";
import moment from "moment";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { confirm } = Modal;
const baseurl = "http://codesohigh.com:8765/article/";

const data = [
  // {
  //   key: "",
  //   title: "",
  //   subTitle: "",
  //   author: "",
  //   date: ""
  // }
];
const initPager = {
  current: 1,
  pageSize: 5,
  pageSizeOptions: [5, 10, 15],
  total: 0
};

// 【文章详情地址】：http://codesohigh.com:8765/article/id
export default function List() {
  const navigate = useNavigate();
  const [articleArr, setArticleArr] = useState(data);
  const [pager, setPager] = useState(initPager);

  const fetchData = async (current, pageSize) => {
    const { arr, num, count, total } = await getArticleList_API(
      current,
      pageSize
    );
    const arrMap = arr.map((item) => ({
      ...item,
      date: moment(item.date).format("YYYY-MM-DD hh:mm:ss"),
      key: item.id
    }));
    setPager({
      current: num,
      pageSize: count,
      pageSizeOptions: [5, 10, 15],
      total
    });
    setArticleArr(arrMap);
  };

  // 处理分页器页码改变
  const handlePageChange = (newPager) => {
    setPager(newPager);
    fetchData(newPager.current, newPager.pageSize);
  };

  // 处理按钮编辑文章
  const handleEdit = (record) => {
    navigate(`/edit/${record.id}`);
  };

  // 处理按钮删除文章
  const handleRemove = async (record) => {
    confirm({
      title: "删除文章?",
      icon: <ExclamationCircleOutlined />,
      content: "确定要删除这篇文章吗？",
      onOk: async () => {
        await removeArticleById_API({ id: record.id });
        message.success("文章删除成功");
        fetchData();
      },
      onCancel() {
        message.info("用户取消了删除操作");
      }
    });
  };

  const columns = [
    {
      title: "文章标题",
      dataIndex: "title",
      key: "title",
      align: "center",
      render: (text, record, index) => (
        <a href={`${baseurl}${record.id}`} target="_blank">
          {text}
        </a>
      )
    },
    {
      title: "副标题",
      dataIndex: "subTitle",
      key: "subTitle",
      align: "center"
    },
    {
      title: "作者",
      dataIndex: "author",
      key: "author",
      width: 180,
      align: "center"
    },
    {
      title: "时间",
      dataIndex: "date",
      key: "date",
      width: 180,
      align: "center"
    },
    {
      title: "操作",
      key: "action",
      align: "center",
      width: "180px",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="btn"
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Button
            type="primary"
            className="btn"
            danger
            onClick={() => handleRemove(record)}
          >
            删除
          </Button>
        </Space>
      )
    }
  ];

  useEffect(() => {
    fetchData(pager.current, pager.pageSize);
  }, []);

  return (
    <div className="list-container">
      <Table
        className="table"
        columns={columns}
        dataSource={articleArr}
        bordered
        scroll={{ y: 440 }}
        pagination={pager}
        onChange={handlePageChange}
      />
    </div>
  );
}
