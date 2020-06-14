import React, { Component } from "react";
import { Upload as AutdUpload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js";
import { nanoid } from "nanoid";

import { reqGetUploadToken } from "@api/edu/upload";

const MAX_VIDEO_SIZE = 30 * 1024 * 1024;

export default class Upload extends Component {
  // 初始化页面时，从本地读取token和expires
  constructor() {
    super();
    const data = localStorage.getItem("upload_token");
    const state = {
      uploadToken: "",
      expires: 0,
    };
    if (data) {
      const { uploadToken, expires } = JSON.parse(data);
      state.uploadToken = uploadToken;
      state.expires = expires;
    }
    this.state = state;
  }

  // 保存凭证
  saveUploadToken = (uploadToken, expires) => {
    const data = {
      uploadToken,
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000, //设置过期时间（提前5分钟刷新）
    };
    this.setState(data);
    localStorage.setItem("upload_token", JSON.stringify(data));
  };

  // 上传之前，确认文件大小及凭证有效期
  beforeUpload = (file, fileList) => {
    return new Promise(async (resolve, reject) => {
      if (file.size > MAX_VIDEO_SIZE) {
        message.warn("上传视频不能超过30mb");
        return reject();
      }
      // 上传之前检查凭证有无过期
      const { expires } = this.state;

      if (expires < Date.now()) {
        const { uploadToken, expires } = await reqGetUploadToken();
        this.saveUploadToken(uploadToken, expires);
      }

      // console.log(uploadToken, expires);

      resolve(file);
    });
  };

  customRequest = ({ file }) => {
    const config = {
      useCdnDomain: true,
      region: qiniu.region.z1,
    };

    const putExtra = {
      fname: "",
      params: {},
      mimeType: ["video/mp4"],
    };

    const key = nanoid(10);

    //   创建上传文件对象
    const observable = qiniu.upload(file, key, "", putExtra, config);
    const observer = {
      // 接收上传进度信息
      next(res) {},
      // 上传错误后触发
      error(err) {},
      // 接收上传完成后的后端返回信息
      complete(res) {},
    };
    const subscription = observable.subscribe(observer); // 上传开始
    // or
    // const subscription = observable.subscribe(next, error, complete); // 这样传参形式也可以
    subscription.unsubscribe(); // 上传取消
  };

  render() {
    return (
      <AutdUpload
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
      >
        <Button>
          <UploadOutlined /> Upload
        </Button>
      </AutdUpload>
    );
  }
}
