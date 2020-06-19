import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { GlobalOutlined } from "@ant-design/icons";

import logo from "@assets/images/logo.png";
import "./index.less";
import SideMenu from "../SideMenu"

const { Header, Content, Footer, Sider } = Layout;

class PrimaryLayout extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout className="layout">
        <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="layout-logo">
            <img src={logo} alt="logo" />
            {!collapsed && <h1>尚硅谷教育管理系统</h1>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="layout-header">
            <img src={logo} alt="avatar" />
            <span>admin</span>
            <GlobalOutlined />
          </Header>
          <Content>
            <div className="layout-nav">
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
              </Breadcrumb>
              <h3>User</h3>
            </div>
            <div className="layout-content"></div>
          </Content>
          <Footer className="layout-footer">
            ©2020课程版权均归硅谷教育管理系统所有
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default PrimaryLayout;
