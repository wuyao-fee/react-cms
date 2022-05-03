import React, { useEffect, useState } from "react";
import { PageHeader, Button, Modal, Form, Input, message } from "antd";
import "./less/edit.less";
import {
  addArticle_API,
  getArticleById_API,
  updateArticle_API
} from "../api/article.js";
import moment from "moment";
import E from "wangeditor";
import { useNavigate, useParams } from "react-router-dom";

let editor = null;

export default function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [subTitle, setSubTitle] = useState();
  const [content, setContent] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const onFinish = (values) => {};

  // 提交表单
  const handleOk = () => {
    form.validateFields().then(async (values) => {
      // 修改文章
      if (params.id) {
        await updateArticle_API({
          title: values.title,
          subTitle: values.subTitle,
          content,
          id: params.id
        });
        message.success("修改文章成功,即将前往文章列表页");
      } else {
        // 新增文章
        await addArticle_API({ ...values, content });
        form.resetFields();
        message.success("添加文章成功,即将前往文章列表页");
      }
      setContent("");
      setIsModalVisible(false);
      setTimeout(() => {
        navigate("/list");
      }, 1500);
    });
  };

  // 通过文章id获取文章信息
  const fetchDataByID = async (articleId) => {
    const res = await getArticleById_API(articleId);
    editor.txt.html(res.content); // 重新设置编辑器内容
    setTitle(res.title);
    setSubTitle(res.subTitle);
  };

  useEffect(() => {
    editor = new E("#editor");
    editor.config.onchange = (newHTML) => {
      setContent(newHTML);
    };
    editor.create();
    if (params.id) {
      fetchDataByID(params.id);
    }
  }, []);

  return (
    <div className="edit-container">
      <PageHeader
        className="site-page-header"
        onBack={params.id ? () => window.history.back() : null}
        title="编辑文章"
        subTitle={`时间：${moment(new Date()).format("YYYY-MM-DD")}`}
        extra={
          <Button
            key="1"
            type="primary"
            onClick={
              content
                ? () => setIsModalVisible(true)
                : () => message.info("请填写内容再提交")
            }
          >
            提交编辑
          </Button>
        }
      />
      {/* 富文本编辑器 */}
      <div id="editor" style={{ height: "400px" }}></div>

      {/* 对话框 */}
      <Modal
        title="添加文章信息"
        visible={isModalVisible}
        okText="提交"
        onOk={handleOk}
        cancelText="取消"
        onCancel={() => setIsModalVisible(false)}
        zIndex={99999}
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ title, subTitle }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: "请填写文章标题"
              }
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="副标题"
            name="subTitle"
            rules={[
              {
                required: false,
                message: "请填写副标题"
              }
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
