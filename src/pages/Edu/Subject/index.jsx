import React, { Component } from "react";

import { Table, Button } from "antd";

import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";

import "./index.less";
import { reqGetSubjectList } from "@api/edu/subject";

export default class Subject extends Component {
  state = {
    subjects: {
      total: 0,
      items: [],
    },
    page: 1,
    limit: 10,
  };

  componentDidMount() {
    this.getSubjectList(1, 10);
  }

  getSubjectList = async (page, limit) => {
    const result = await reqGetSubjectList(page, limit);
    this.setState({
      subjects: {
        total: result.total,
        items: result.items,
      },
      page,
      limit,
    });
  };

  render() {
    const { subjects, page, limit } = this.state;

    const columns = [
      { title: "分类名称", dataIndex: "title", key: "title" },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: () => (
          <>
            <Button type="primary">
              <FormOutlined />
            </Button>
            <Button type="danger" className="subject-btn">
              <DeleteOutlined />
            </Button>
          </>
        ),
      },
    ];

    return (
      <div className="subject">
        <Button type="primary" className="subject-btn">
          <PlusOutlined />
          新建
        </Button>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={subjects.items}
          rowKey="_id"
          pagination={{
            defaultCurrent: 3,
            total: subjects.total,
            // defaultPageSize: 10,
            pageSizeOptions: ["5", "10", "15", "20"],
            showQuickJumper: true,
            showSizeChanger: true,
            current: page, //当前页数
            pageSize: limit, //每页条数
            onChange: this.getSubjectList,
            onShowSizeChange: this.getSubjectList,
          }}
        />
      </div>
    );
  }
}
