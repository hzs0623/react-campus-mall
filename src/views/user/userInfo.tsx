import React, { PureComponent } from "react";
import { Card, Table, Popconfirm, message, Form, Button, Input } from "antd";
import UserDrawer from "./components/Drawer";
import dayjs from "dayjs";
import { adminStateMap } from "../../constant";
import { sexData } from "../../utils/initData";
import { getList, userEdit, userDelete } from "../../api/user";

interface AppProps {
  // actions: Actions,
  [propName: string]: any;
}

interface AppState {
  page: number;
  pageSize: number;
  total: number;
  list: Array<object>;
  loading: boolean;
  isModalVisible: boolean;
  editForm: Object;
  form: Object;
}

export default class User extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      loading: false,
      isModalVisible: false,
      editForm: {}, // 修改数据
      form: {
        sno: null,
        phone: null,
        username: null,
      },
    };
  }

  async getList() {
    try {
      const { page = 1, pageSize = 10, form } = this.state;
      this.setState({ loading: true });
      const res = await getList({
        curPage: page,
        pageSize: pageSize,
        ...form,
      });

      const { total = 0, list = [] } = res || {};
      this.setState({
        total,
        list,
      });
    } finally {
      this.setState({ loading: false });
    }
  }

  onFinish(form: any) {
    this.setState(
      {
        form,
      },
      () => {
        this.getList();
      }
    );
  }

  onChange(page: number) {
    this.setState(
      {
        page,
      },
      () => {
        this.getList();
      }
    );
  }

  componentDidMount() {
    this.getList();
  }
  columns = [
    {
      title: "序号",
      dataIndex: "index",
      key: "index",
      render: (text: any, row: any, index: number) => (this.state.page - 1) * 10 + index + 1,
    },
    {
      title: "uid",
      dataIndex: "uid",
      key: "uid",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "真实姓名",
      dataIndex: "real_name",
      key: "real_name",
    },
    {
      title: "权限等级",
      dataIndex: "admin_state",
      key: "admin_state",
      render: (text: string | number) => {
        return adminStateMap[text];
      },
    },
    {
      title: "性别",
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => {
        return sexData[text] || "";
      },
    },
    {
      title: "联系地址",
      dataIndex: "shipping_address",
      key: "shipping_address",
      ellipsis: true,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "学号",
      dataIndex: "sno",
      key: "sno",
    },
    {
      title: "创建时间",
      dataIndex: "create_time",
      key: "create_time",
      render: (text: any) => {
        text = Number(text);
        return dayjs(text).format(`YYYY-MM-DD HH:mm`);
      },
    },
    {
      title: "更新时间",
      dataIndex: "update_time",
      key: "update_time",
      render: (text: any) => {
        text = Number(text);
        return dayjs(text).format(`YYYY-MM-DD HH:mm`);
      },
    },
    {
      title: "操作",
      dataIndex: "option",
      key: "option",
      width: "200px",
      render: (text: any, row: any) => {
        return (
          <>
            <Button type="primary" onClick={() => this.handleEdit(row)}>
              修改
            </Button>

            <Popconfirm
              title="该操作将删除当前用户，是否继续?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                this.handleDelete(row);
              }}
              onCancel={() => {
                message.warn("已取消操作");
              }}
            >
              <Button danger>删除</Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  async handleDelete(row: any) {
    await userDelete({ uid: row.uid });
    // message.success("删除成功");
    this.getList();
  }

  handleEdit(row: any) {
    this.setState({
      editForm: row,
      isModalVisible: true,
    });
  }

  // 关闭修改信息
  UserDrawerClose() {
    this.setState({
      editForm: {},
      isModalVisible: false,
    });
  }

  // 修改用户信息
  async editSubmit(data: any) {
    const params = Object.assign({}, this.state.editForm, data);
    await userEdit(params);
    this.getList();
    this.UserDrawerClose();
    message.success("修改成功！");
  }

  render() {
    const { list, total, loading, page, isModalVisible, editForm } = this.state;
    return (
      <div className="page-user">
        <Card>
          <Form name="customized_form_controls" onFinish={this.onFinish.bind(this)} layout="inline">
            <Form.Item name="username" label="用户名">
              <Input />
            </Form.Item>
            <Form.Item name="sno" label="学号">
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="手机号">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Table
          style={{ marginTop: "10px" }}
          columns={this.columns}
          dataSource={list}
          loading={loading}
          pagination={{
            current: page,
            total: total,
            onChange: this.onChange.bind(this),
          }}
          rowKey={(item: any) => item.uid}
        />
        <UserDrawer
          isModalVisible={isModalVisible}
          formData={editForm}
          onClose={this.UserDrawerClose.bind(this)}
          editSubmit={this.editSubmit.bind(this)}
        />
      </div>
    );
  }
}
