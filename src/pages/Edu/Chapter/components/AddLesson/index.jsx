import React from "react";
import { Card, PageHeader, Form, Button, Input, Switch, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import Upload from "@comps/Upload";
import { reqAddLesson } from "@api/edu/lesson";

import "./index.less";

// 表单的布局属性
const layout = {
  labelCol: { span: 2 }, // label文字所占宽度比例
  wrapperCol: { span: 4 }, // 右边Input所占宽度比例
};
export default function AddLesson({ history, location }) {
  const onBack = () => {
    history.push("/edu/chapter/list");
  };
  const onFinish = async (values) => {
    const chapterId = location.state._id;
    await reqAddLesson({ ...values, chapterId });
    message.success("添加课时成功");
    history.push("/edu/chapter/list");
  };
  return (
    <Card
      title={
        <PageHeader
          className="add-lesson-header"
          onBack={onBack}
          title="新增课时"
        />
      }
    >
      <Form {...layout} onFinish={onFinish} initialValues={{ free: true }}>
        <Form.Item
          label="课时名称"
          name="title"
          rules={[{ required: true, message: "请输入课时名称" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="是否免费"
          name="free"
          rules={[{ required: true, message: "请选择是否免费" }]}
          valuePropName="checked"
        >
          <Switch checkedChildren="是" unCheckedChildren="否" defaultChecked />
        </Form.Item>
        <Form.Item
          label="上传视频"
          name="video"
          rules={[{ required: true, message: "请上传视频" }]}
        >
          <Upload>
            <Button>
              <UploadOutlined />
            </Button>
          </Upload>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="add-lesson-btn">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}
