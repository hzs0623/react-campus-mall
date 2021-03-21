import React from "react";
import "./index.less";
import { Layout , Avatar, Menu, Dropdown } from "antd";
import { UserOutlined  } from '@ant-design/icons';
import { setUser } from '../../redux/actions';
import store from '../../redux';
import { pro_token } from '../../constant';
const { Header } = Layout;

const HeaderCom = () => {
  // 退出登录
  const outLog = () => {
    setUser({
      token: "",
      user: "",
      uid: 0
    })(store.dispatch);
    window.localStorage.removeItem(pro_token);
    // 跳转登录页面
    window.location.href = `${window.location.origin}/#/login`
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="layout-header-item" onClick={outLog}>退出</div>
      </Menu.Item>
    </Menu>
  )

  return <Header className="site-layout-header">
    <Dropdown overlay={menu} trigger={['click']}>
      <Avatar size={28} shape="square" icon={<UserOutlined />}></Avatar>
    </Dropdown>
  
  </Header>;
};

export default HeaderCom;
