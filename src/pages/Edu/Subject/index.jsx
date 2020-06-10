import React, { Component } from "react";
import { Button, Table } from "antd";
import { PlusOutlined, FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect } from "react-redux";

import "./index.less";
import { getSubjectList, getSubSubjectList } from "./redux";

@connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
  getSubSubjectList,
})
class Subject extends Component {
  state = {
    expandedRowKeys: [],
  };
  componentDidMount() {
    this.props.getSubjectList(1, 10);
  }

  // handleExpand = (expanded, record) => {
  //   // console.log(expanded, record);
  //   if (!expanded) return;
  //   this.props.getSubSubjectList(record._id);
  // };
  handleExpandedRowsChange = (expandedRowKeys) => {
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      this.props.getSubSubjectList(expandedRowKeys[length - 1]);
    }

    this.setState({
      expandedRowKeys,
    });
  };

  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  render() {
    const { subjectList, getSubjectList } = this.props;
    const { expandedRowKeys } = this.state;
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
        <Button
          type="primary"
          className="subject-btn"
          onClick={this.showAddSubject}
        >
          <PlusOutlined />
          新增
        </Button>
        <Table
          columns={columns}
          expandable={{
            /*  expandedRowRender: (record) => {
              const children = record.children ? record.children : [];
              return children.map((subSubject) => {
                return (
                  <div key={subSubject._id}>
                    <div>{subSubject.title}</div>
                    <div>
                      <Button type="primary">
                        <FormOutlined />
                      </Button>
                      <Button type="danger" className="subject-btn">
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </div>
                );
              });
            },
            onExpand: this.handleExpand, */

            expandedRowKeys,
            onExpandedRowsChange: this.handleExpandedRowsChange,
          }}
          rowKey="_id"
          dataSource={subjectList.items}
          pagination={{
            total: subjectList.total,
            showSizeChanger: true,
            showQuickJumper: true,
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: getSubjectList,
            onShowSizeChange: getSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
