import React, { Component } from "react";
import { Upload as AutdUpload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import * as qiniu from "qiniu-js";
import { nanoid } from "nanoid";

import { reqGetUploadToken } from "@api/edu/upload";
import qiniuConfig from "@conf/qiniu";

const MAX_VIDEO_SIZE = 30 * 1024 * 1024;

export default class Upload extends Component {
  // 本地读取凭证
  getUploadToken = () => {
    try {
      const { uploadToken, expires } = JSON.parse(
        localStorage.getItem("upload_token")
      );
      if (!this.isValidUploadToken(expires)) {
        throw new Error("uploadToken过期了");
      }
      return { uploadToken, expires };
    } catch {
      return {
        uploadToken: "",
        expires: 0,
      };
    }
  };
  // 初始化
  state = { ...this.getUploadToken(), isUploadSuccess: false };

  // 判断凭证是否有效
  isValidUploadToken = (expires) => {
    return expires > Date.now();
  };

  // 保存凭证
  saveUploadToken = (uploadToken, expires) => {
    const data = {
      uploadToken,
      expires: Date.now() + expires * 1000 - 5 * 60 * 1000, //设置过期时间（提前5分钟刷新）
    };
    this.setState(data);
    localStorage.setItem("upload_token", JSON.stringify(data));
  };

  //请求凭证
  fetchUploadToken = async () => {
    const { uploadToken, expires } = await reqGetUploadToken();
    this.saveUploadToken(uploadToken, expires);
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

      if (!this.isValidUploadToken(expires)) {
        await this.fetchUploadToken();
      }

      // console.log(uploadToken, expires);

      resolve(file);
    });
  };

  customRequest = ({ file, onProgress, onSuccess, onError }) => {
    const { uploadToken } = this.state;

    const config = {
      // useCdnDomain: true,
      region: qiniuConfig.region,
    };

    const putExtra = {
      fname: "",
      // params: {},
      mimeType: ["video/mp4"],
    };

    const key = nanoid(10);

    //   创建上传文件对象
    const observable = qiniu.upload(file, key, uploadToken, putExtra, config);
    const observer = {
      // 接收上传进度信息
      next(res) {
        // 更新进度
        const percent = res.total.percent.toFixed(2);
        onProgress({ percent }, file);
      },
      // 上传错误后触发
      error(err) {
        onError(err);
        message.error("上传失败");
      },
      // 接收上传完成后的后端返回信息
      complete: (res) => {
        onSuccess(res);
        message.success("上传成功");
        // console.log(res);  //{hash: "FtaFsLF3Z_j_-q209fBTqb7pQheN", key: "ps3SiCDVgO"}
        const video = qiniuConfig.prefix_url + res.key;
        this.props.onChange(video);
        this.setState({
          isUploadSuccess: true,
        });
      },
    };
    this.subscription = observable.subscribe(observer); // 上传开始
    // or
    // const subscription = observable.subscribe(next, error, complete); // 这样传参形式也可以
  };

  componentWillUnmount() {
    // 上传取消
    // 如果没有上传过 this.subscription时undefined，此时不需要取消上传~
    this.subscription && this.subscription.unsubscribe();
  }

  //
  remove = () => {
    this.subscription && this.subscription.unsubscribe(); // 上传取消
    this.props.onChange("");
    this.setState({
      isUploadSuccess: false,
    });
  };

  componentWillUnmount() {}

  render() {
    const { isUploadSuccess } = this.state;
    return (
      <AutdUpload
        accept="video/mp4"
        listType="card"
        beforeUpload={this.beforeUpload}
        customRequest={this.customRequest}
        onRemove={this.remove}
      >
        {isUploadSuccess ? null : (
          <Button>
            <UploadOutlined /> 上传视频
          </Button>
        )}
      </AutdUpload>
    );
  }
}
