import React, { useEffect, useState } from "react";
import "./less/means.less";
import { getUserInfo_API, updateUserInfo_API } from "../api/means.js";
import { Form, Input, Button, Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import store from "../store";
import { createSetAvatarAction } from "../store/action/avatarAction";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export default function Means() {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchData = async () => {
    const res = await getUserInfo_API();
    setUsername(res.username);
    setPassword(res.password);
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImageUrl(imageUrl);
        setLoading(false);
        localStorage.setItem("avatar", info.file.response.data.filePath);
        store.dispatch(createSetAvatarAction(info.file.response.data.filePath));
      });
    }
  };

  const onFinish = async (values) => {
    const localUsername = localStorage.getItem("username");
    if (
      values.username &&
      values.username !== localUsername &&
      values.password.trim() !== ""
    ) {
      await updateUserInfo_API({
        username: values.username,
        password: values.password
      });
      message.success("修改密码成功,请重新登录");
      localStorage.removeItem("username");
      localStorage.removeItem("avatar");
      localStorage.removeItem("player");
      localStorage.removeItem("cms-token");
      localStorage.removeItem("editable");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="means-container">
      <Form
        className="form"
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="新用户名" name="username">
          <Input placeholder="请输入新的用户名" />
        </Form.Item>

        <Form.Item label="新的密码" name="password">
          <Input.Password placeholder="请输入新的密码" />
        </Form.Item>

        <Form.Item>
          <p>请点击上传用户头像：</p>
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/manage/upload"
            beforeUpload={beforeUpload}
            onChange={handleChange}
            headers={{ "cms-token": localStorage.getItem("cms-token") }}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            确认修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
