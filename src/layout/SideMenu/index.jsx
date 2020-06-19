import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import icons from "@conf/icons";
import { defaultRoutes } from "@conf/routes";

const { SubMenu } = Menu;

@connect((state) => ({ permissionList: state.user.permissionList }))
class SideMenu extends Component {
  renderMenu = (menuList, parentPath = "") => {
    return menuList.map((menu) => {
      const { children, path, icon, name, hidden } = menu;
      if (hidden) return null;
      const Icon = icons[icon];

      // 二级菜单
      if (children && children.length) {
        return (
          <SubMenu key={path} icon={<Icon />} title={name}>
            {this.renderMenu(children, path)}
          </SubMenu>
        );
      } else {
        //   一级菜单
        const currentPath = parentPath + path;
        return (
          <Menu.Item key={currentPath} icon={icon ? <Icon /> : null}>
            <Link to={currentPath}>{name}</Link>
          </Menu.Item>
        );
      }
    });
  };

  render() {
    const { permissionList } = this.props;
    console.log(permissionList);

    return (
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        {this.renderMenu(defaultRoutes)}
        {this.renderMenu(permissionList)}
      </Menu>
    );
  }
}

export default SideMenu;
