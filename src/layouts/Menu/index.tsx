import React from "react";
import { Menu, Layout } from "antd";
import menusConfig, { ChildrenMenu } from "../../config/menus";
import { Link, withRouter } from "react-router-dom";
const { SubMenu } = Menu;
const { Sider } = Layout;

function getMenuItems(menusData: any) {
  if (!menusData) {
    return [];
  }
  return menusData.map((item: ChildrenMenu) => {
    const { path, name, icon: Icon } = item;
    return (
      <Menu.Item key={path}>
        <Link to={item.path}>
          {Icon ? <Icon /> : null}
          <span> {name}</span>
        </Link>
      </Menu.Item>
    );
  });
}

const Menus = (props: any) => {
  const collapsed = false;

  const defaultSelectedKeys: string[] | undefined = []; // 默认选择
  return (
    <Sider collapsible collapsed={collapsed}>
      <Menu theme="dark" defaultSelectedKeys={defaultSelectedKeys} mode="inline">
        {menusConfig.map((item) => {
          const { path, children, name, icon: Icon } = item;
          return (
            <SubMenu key={path} icon={<Icon />} title={name}>
              {getMenuItems(children)}
            </SubMenu>
          );
        })}
      </Menu>
    </Sider>
  );
};

export default withRouter(Menus);
