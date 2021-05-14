import React, { useState, useEffect } from "react";
import "./index.less";
import { Layout, Avatar, Menu, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { setUser } from "../../redux/actions";
import store from "../../redux";
import { pro_token } from "../../constant";
const { Header } = Layout;

const HeaderCom: React.FC = () => {
  const [grade, setGrade] = useState(store.getState().global.admin_state);
  useEffect(() => {
    init();
  });

  const init = () => {
    if (!store.getState().global.token) {
      // 获取本地存储数据 如果没有 直接返回登录界面
      const loginUrl = `${window.location.origin}/#/login`;
      try {
        const data = window.localStorage.getItem(pro_token) || "";
        if (!data) {
          window.location.href = loginUrl;
        }
        const res = JSON.parse(data);
        setUser(res)(store.dispatch);
        // 设置管理员等级
        const { admin_state } = res || {};
        setGrade(admin_state);
      } catch (e) {
        window.location.href = loginUrl;
      }
    }
  };

  // 退出登录
  const outLog = () => {
    setUser({
      token: "",
      user: "",
      uid: 0,
      admin_state: 0,
    })(store.dispatch);
    window.localStorage.removeItem(pro_token);
    // 跳转登录页面
    window.location.href = `${window.location.origin}/#/login`;
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div className="layout-header-item" onClick={outLog}>
          退出
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-header">
      <div className="layout-job">{grade === 3 ? "超级" : ""}管理员</div>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Avatar size={28} shape="square" icon={<UserOutlined />}></Avatar>
      </Dropdown>
    </Header>
  );
};

export default HeaderCom;
