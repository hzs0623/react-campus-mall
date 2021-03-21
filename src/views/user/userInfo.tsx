import React, { PureComponent } from "react";
import { getList } from "../../api/user";
import { Card, Form, Button, Input, Table, } from 'antd';
import dayjs from "dayjs";


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
}
interface AdminState {
  [propName: string]: string;
}

const adminStateMap: AdminState = {
  '1': '普通用户',
  '2': '管理员',
  '3': '超级管理员',
}

export default class User extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      loading: false
    }
  }
  
  async getList() {
    try {
      const { page = 1, pageSize = 10 } = this.state;
      this.setState({loading: true})
      const res = await getList({
        curPage: page,
        pageSize: pageSize
      });
   
      const { total = 0, list = []} = res || {};
      this.setState({
        total,
        list,
      });
    } finally {
      this.setState({loading: false})
    }
  }

  onFinish(form:any) {
    console.log(form)
  }

  onChange(page:number) {
    this.setState({
      page
    }, () => {
      this.getList();
    })
  }

  componentDidMount() {
    this.getList();
  }

  columns = [
    {
      title: 'uid',
      dataIndex: 'uid',
      key: 'uid',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '真实姓名',
      dataIndex: 'real_name',
      key: 'real_name',
    },
    {
      title: '权限等级',
      dataIndex: 'admin_state',
      key: 'admin_state',
      render: (text: string | number) => {
        return adminStateMap[text]
      }
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: '联系地址',
      dataIndex: 'shipping_address',
      key: 'shipping_address',
      ellipsis: true
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '学号',
      dataIndex: 'sno',
      key: 'sno',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text:any) => {
        text = Number(text)
        return dayjs(text).format(`YYYY-MM-DD HH:mm`)
      },
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (text:any) => {
        text = Number(text)
        return dayjs(text).format(`YYYY-MM-DD HH:mm`)
      },
    },
  ]

  render() {
    const { list, total, loading, page } = this.state;
    return (
    <div className="page-user">
         <Card>
          <Form name="customized_form_controls" onFinish={this.onFinish.bind(this)}  layout="inline">
            <Form.Item name="username" label="用户名">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Table style={ {marginTop: "10px"} }  columns={ this.columns } dataSource={ list } loading={ loading } pagination={{
         current: page,
         total: total,
         onChange: this.onChange.bind(this)
       }} rowKey={(item: any) => item.uid} />
    </div>);
  }
}
