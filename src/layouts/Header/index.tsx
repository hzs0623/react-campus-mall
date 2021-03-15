import React from "react";
import "./index.less";
import { Layout , Avatar} from "antd";
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;

const HeaderCom = () => {
  return <Header className="site-layout-header">
    <Avatar size={28} shape="square" icon={<UserOutlined />}></Avatar>
  </Header>;
};

export default HeaderCom;
