import React, { PureComponent } from "react";
import { Card, Form, Button, Input, Table, Tag, Space } from 'antd';
import { getList } from "../../api/shop";
import dayjs from "dayjs";


interface AppProps {
  [propName: string]: any;
}

interface AppState {
  pageSize?: number,
  curPage?: number,
  list: Array<object>,
  total: number,
  loading: boolean
}
export default class management extends PureComponent<AppProps, AppState> {

  constructor(props:any) {
    super(props);
    this.state = {
      pageSize: 10,
      curPage: 1,
      list: [],
      total: 0,
      loading:false
    }
  }
  
  componentDidMount() {
    this.getList();
  }

  async getList() {
    const { pageSize, curPage } = this.state;
    this.setState({
      loading:true
    })
    const res = await getList({
      pageSize,
      curPage
    });
    const { total = 0, list = [] } = res || {};
    this.setState({
      total: total,
      list: list,
      loading:false
    })
  }

  onFinish(values:any) {
    this.getList();
  }

  onChange(page:number) {
    this.setState({
      curPage: page
    }, () => {
      this.getList()
    });
    
  }

  columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true
    },
    {
      title: '成色',
      dataIndex: 'level',
      key: 'level',
      render: (text: number) => {
        const color = text > 5 ? 'green' : '#ffe793';
        return <Tag color= {color}> {text} </Tag>
      }
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'count',
      key: 'count',
    },
    {
      title: '简介',
      dataIndex: 'information',
      key: 'information',
      ellipsis: true
    },
    {
      title: '发布日期',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (text:any) => {
        return dayjs(text).format(`YYYY-MM-DD HH:mm`)
      },
    },
    {
      title: '修改日期',
      dataIndex: 'update_time',
      key: 'update_time',
      render: (text:any) => {
        return dayjs(text).format(`YYYY-MM-DD HH:mm`)
      },
    },
    {
      title: 'Action',
      key: 'operation',
      width: 160,
      render:(text: any, record:any) => (
        <Space size="middle">
          <a>修改</a>
          <a>删除</a>
        </Space>
      )
    },
  ]

  render() {
    const {loading, list, total, curPage } = this.state;
    return (
      <div className="page-user">
        <Card>
          <Form name="customized_form_controls" onFinish={this.onFinish.bind(this)}  layout="inline">
            <Form.Item name="titil" label="商品标题">
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
         current: curPage,
         total: total,
         onChange: this.onChange.bind(this)
       }} rowKey={(item: any) => item.id} />

      </div>
    );
  }
}
