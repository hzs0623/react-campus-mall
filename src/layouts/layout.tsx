import { Layout } from "antd";
import Header from "./Header";
import React from "react";
import Menus from "./Menu";
// import Breadcrumb from "./Breadcrumb";
const { Content, Footer } = Layout;


const BaseLayout = (props: any) => {
  const { children } = props;
  
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Menus />
      <Layout className="site-layout">
        <Header />
        <Content  style={{ margin: "10px" }}>
          {children}
        </Content>
        <Footer style={{ textAlign: "center" }}>淘金校园商城 ©2021 Created by 一方</Footer>
      </Layout>
    </Layout>
  );
};

export default BaseLayout;
