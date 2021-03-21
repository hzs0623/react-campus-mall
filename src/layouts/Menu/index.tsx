import React, { useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([props.history.location.pathname]);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  const onOpenChange = (data: any) => {
    if (data && data.length) {
      setOpenKeys([data[data.length - 1]]);
    }
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[props.history.location.pathname]}
        onOpenChange={onOpenChange}
        openKeys={openKeys}
      >
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
