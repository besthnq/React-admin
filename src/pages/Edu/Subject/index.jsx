import React, { Component } from "react";
import { Button, Table, Tooltip, Input, message, Modal } from "antd";
import {
  PlusOutlined,
  FormOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { connect } from "react-redux";

import "./index.less";
import { getSubjectList, getSubSubjectList, updateSubject } from "./redux";
import { reqDelSubject } from "@api/edu/subject";

const { confirm } = Modal;

@connect((state) => ({ subjectList: state.subjectList }), {
  getSubjectList,
  getSubSubjectList,
  updateSubject,
})
class Subject extends Component {
  state = {
    expandedRowKeys: [], //展开项
    subjectId: "", //默认课程Id
    updateSubjectTitle: "", // 正在更新分类的标题
    subjectTitle: "", //正在更新的分类标题
    current: 1, // 当前页数
    pageSize: 10, // 每页条数
  };
  componentDidMount() {
    // 代表一上来请求第一页数据
    this.props.getSubjectList(1, 10);
  }

  // handleExpand = (expanded, record) => {
  //   // console.log(expanded, record);
  //   if (!expanded) return;
  //   this.props.getSubSubjectList(record._id);
  // };

  // 点击展开一级菜单，请求二级菜单
  handleExpandedRowsChange = (expandedRowKeys) => {
    const length = expandedRowKeys.length;
    if (length > this.state.expandedRowKeys.length) {
      this.props.getSubSubjectList(expandedRowKeys[length - 1]);
    }

    this.setState({
      expandedRowKeys,
    });
  };

  // 显示添加页面
  showAddSubject = () => {
    this.props.history.push("/edu/subject/add");
  };

  // 解决在第二页切换每页数量时显示数据不正确问题~
  getFirstPageSubjectList = (page, limit) => {
    // 每页数量发生变化触发的回调
    this.props.getSubjectList(1, limit);
  };

  // 显示更新分类
  showUpdateSubject = (subject) => {
    return () => {
      this.setState({
        subjectId: subject._id,
        subjectTitle: subject.title,
      });
    };
  };

  // 更新分类
  updateSubject = async () => {
    const { subjectId, updateSubjectTitle, subjectTitle } = this.state;

    if (!updateSubjectTitle) {
      message.warn("请输入要更新课程分类标题~");
      return;
    }
    if (updateSubjectTitle === subjectTitle) {
      message.warn("输入更新课程分类标题不能与之前一样~");
      return;
    }

    await this.props.updateSubject(updateSubjectTitle, subjectId);
    message.success("更新成功~~");
    this.cancel();
  };

  // 取消更新
  cancel = () => {
    this.setState({
      subjectId: "",
      updateSubjectTitle: "",
    });
  };

  //收集更新分类标题数据
  handleInputChange = (event) => {
    this.setState({
      updateSubjectTitle: event.target.value,
    });
  };

  getSubjectList = (page, limit) => {
    this.setState({
      current: page,
      pageSize: limit,
    });
    return this.props.getSubjectList(page, limit);
  };

  delSubject = (subject) => {
    return () => {
      Modal.confirm({
        title: (
          <p>
            你确认要删除 <span className="subject-text">{subject.title}</span>{" "}
            课程分类吗?
          </p>
        ),
        icon: <ExclamationCircleOutlined />,
        onOk: async () => {
          // 点击确认回调函数
          await reqDelSubject(subject._id);
          // 删除成功
          message.success("删除课程分类数据成功~");
          // 请求新的分页数据~
          const { current, pageSize } = this.state;
          // 如果删除的数据只有一条，应该要跳转到前一页
          // 前提条件是必须是大于1，page为2以上
          // 前提条件删除分类是一级分类
          if (
            current > 1 &&
            this.props.subjectList.items.length === 1 &&
            subject.parentId === "0"
          ) {
            this.getSubjectList(current - 1, pageSize);
            return;
          }

          this.getSubjectList(current, pageSize);
        },
        // onCancel() {
        //   // 点击取消的回调函数
        //   console.log("Cancel");
        // },
      });
    };
  };

  render() {
    const { subjectList } = this.props;
    const { expandedRowKeys, current, pageSize } = this.state;
    const columns = [
      {
        title: "分类名称",
        dataIndex: "",
        key: "title",
        render: (subject) => {
          // console.log(subject);
          const { subjectId } = this.state;
          if (subjectId === subject._id) {
            return (
              <Input
                className="subject-input"
                defaultValue={subject.title}
                onChange={this.handleInputChange}
              ></Input>
            );
          }
          return <span>{subject.title}</span>;
        },
      },
      {
        title: "操作",
        dataIndex: "",
        key: "action",
        width: 200,
        render: (subject) => {
          // console.log(subject);
          const { subjectId } = this.state;
          if (subjectId === subject._id) {
            return (
              <>
                <Button type="primary" onClick={this.updateSubject}>
                  确认
                </Button>
                <Button className="subject-btn" onClick={this.cancel}>
                  取消
                </Button>
              </>
            );
          }

          return (
            <>
              <Tooltip title="更新课程分类">
                <Button
                  type="primary"
                  onClick={this.showUpdateSubject(subject)}
                >
                  <FormOutlined />
                </Button>
              </Tooltip>
              <Tooltip title="删除课程分类">
                <Button
                  type="danger"
                  className="subject-btn"
                  onClick={this.delSubject(subject)}
                >
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </>
          );
        },
      },
    ];
    // console.log(subjectList);
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
            current,
            pageSize,
            total: subjectList.total,
            showQuickJumper: true, // 是否显示快速跳转
            showSizeChanger: true, // 是否显示修改每页显示数量
            pageSizeOptions: ["5", "10", "15", "20"],
            defaultPageSize: 10,
            onChange: this.getSubjectList, // 页码发生变化触发的回调
            onShowSizeChange: this.getFirstPageSubjectList,
          }}
        />
      </div>
    );
  }
}

export default Subject;
