import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, Table } from "antd";
import { getList as shopCartList } from "../../api/shopCart";
import { sellStateMap } from "../../constant";
import dayjs from "dayjs";

const ShopCart: React.FC = () => {
  const [curPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form] = Form.useForm();

  const getList = async () => {
    try {
      setLoading(true);
      const res = await shopCartList({
        curPage: curPage,
        pageSize: 10,
      });
      const { total = 0, list = [] } = res || {};
      setTotal(total);
      setList(list);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (page: number) => {
    setPage(page);
  };

  const onFinish = (val: any) => {
    console.log(val);
    getList();
  };

  const onReset = () => {
    form.resetFields();
  };

  useEffect(() => {
    getList();
  }, [curPage]);

  const renderTable = () => {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "商品ID",
        dataIndex: "sid",
        key: "sid",
      },
      {
        title: "用户ID",
        dataIndex: "uid",
        key: "uid",
      },
      {
        title: "商品数量",
        dataIndex: "shop_count",
        key: "shop_count",
      },
      {
        title: "商品状态",
        dataIndex: "display",
        key: "display",
        render: (display: number) => sellStateMap[display],
      },
      {
        title: "创建时间",
        dataIndex: "create_time",
        key: "create_time",
        render: (text: any) => {
          return dayjs(text).format(`YYYY-MM-DD HH:mm`);
        },
      },
      {
        title: "更新时间",
        dataIndex: "update_time",
        key: "update_time",
        render: (text: any) => dayjs(text).format(`YYYY-MM-DD HH:mm`),
      },
    ];
    return (
      <Table
        style={{ marginTop: "10px" }}
        columns={columns}
        dataSource={list}
        loading={loading}
        pagination={{
          current: curPage,
          total,
          onChange,
        }}
        rowKey={(item: any) => item.id}
      />
    );
  };

  const renderForm = () => {
    return (
      <Card>
        <Form form={form} name="customized_form_controls" onFinish={onFinish} layout="inline">
          <Form.Item name="title" label="商品标题">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="button" className="reset" onClick={onReset}>
              清空
            </Button>
          </Form.Item>
        </Form>
      </Card>
    );
  };
  return (
    <div>
      {renderForm()}
      {renderTable()}
    </div>
  );
};

export default ShopCart;
