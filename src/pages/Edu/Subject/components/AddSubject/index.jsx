import React, { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSubjectList } from "../../redux";
import { reqAddSubject } from "@api/edu/subject";

import "./index.less";

const { Option } = Select;
let page = 1;

function AddSubject({ total, getSubjectList, history }) {
  const [subjects, setSubjects] = useState([]);

  // 表单的布局属性
  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 6 },
  };

  // 表单校验成功：
  const onFinish = async (values) => {
    await reqAddSubject(values.title, values.parentId);
    message.success("成功");
    history.push("/edu/subject/list");
  };

  // 工厂函数组件：发送请求请求数据
  useEffect(() => {
   page = 1
    const fetchData = async () => {
      const items = await getSubjectList(page++, 10);
      setSubjects(items);
    };
    fetchData();
  }, [getSubjectList]);

  // 点击加载更多数据
  const loadMore = async () => {
    const result = await getSubjectList(page++, 10);
    setSubjects([...subjects, ...result]);
  };

  return (
    <Card
      title={
        <>
          <Link to="/edu/subject/list">
            <ArrowLeftOutlined />
          </Link>
          <span className="title">添加课程分类</span>
        </>
      }
    >
      <Form {...layout} onFinish={onFinish}>
        <Form.Item
          label="课程分类名称"
          name="title"
          rules={[{ required: true, message: "请输入课程分类名称" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="父级分类"
          name="parentId"
          rules={[{ required: true, message: "请选择父级分类" }]}
        >
          <Select
            dropdownRender={(menu) => (
              <div>
                {menu}
                {total <= subjects.length ? (
                  "没有更多数据了"
                ) : (
                  <Button type="link" onClick={loadMore}>
                    加载更多数据
                  </Button>
                )}
              </div>
            )}
          >
            <Option key={0} value="0">
              一级分类
            </Option>
            {subjects.map((subject, index) => {
              return (
                <Option key={index + 1} value={subject._id}>
                  {subject.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            添加
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default connect((state) => ({ total: state.subjectList.total }), {
  getSubjectList,
})(AddSubject);
