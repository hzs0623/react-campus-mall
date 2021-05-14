import React, { PureComponent } from "react";
import { Drawer, Col, Row, Button, Input, Form, Select } from "antd";
import { FormInstance } from "antd/lib/form";

import { AppProps, AppState } from "./interfact";
import { sexData } from "../../../utils/initData";

const { Option } = Select;

export default class UserDrawer extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {};
  }

  formRef = React.createRef<FormInstance>();

  editFinish(data: any) {
    this.props.editSubmit(data);
  }

  sexOptions() {
    return Object.keys(sexData).map((key: string) => {
      return (
        <Option value={key} key={key}>
          {sexData[key]}
        </Option>
      );
    });
  }

  handleReset() {
    this.props.onClose();
  }

  componentDidUpdate() {
    this.initUpdataForm();
  }

  // 初始化更新数据
  initUpdataForm() {
    const { formData, isModalVisible } = this.props;
    isModalVisible && this.formRef.current!.setFieldsValue(formData);
  }

  drawerRender() {
    const { isModalVisible } = this.props;
    return (
      <Drawer
        title="修改用户信息"
        width={720}
        visible={isModalVisible}
        onClose={this.handleReset.bind(this)}
      >
        <Form layout="vertical" ref={this.formRef} onFinish={this.editFinish.bind(this)}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="username"
                label="用户名"
                rules={[{ required: true, message: "Please enter user username" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="real_name"
                label="真实姓名"
                rules={[{ required: true, message: "输入正确的真实姓名" }]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="gender"
                label="性别"
                rules={[{ required: true, message: "Please enter sex" }]}
              >
                <Select placeholder="请选择性别">{this.sexOptions()}</Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="联系电话"
                rules={[{ required: true, message: "Please enter phone" }]}
              >
                <Input placeholder="Please enter phone"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="sno"
                label="学号"
                rules={[{ required: true, message: "请输入学号" }]}
              >
                <Input placeholder="请输入学号"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="shipping_address" label="收获地址">
                <Input placeholder="请输入收获地址"></Input>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              修改
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    );
  }

  render() {
    return this.drawerRender();
  }
}
