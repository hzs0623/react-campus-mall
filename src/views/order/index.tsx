import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, Table } from "antd";
import { getList as getLists } from "../../api/order";
import dayjs from "dayjs";
import { methodMap, sellStateMap } from "../../constant";

const Order: React.FC = () => {
  const [form] = Form.useForm();

  const init = {
    pageSize: 10,
  };

  const [curPage, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getList = async () => {
    try {
      setLoading(true);
      const res = await getLists({
        curPage: curPage,
        pageSize: init.pageSize,
      });
      const { total = 0, list = [] } = res || {};
      setTotal(total);
      setList(list);
    } finally {
      setLoading(false);
    }
  };
  const onFinish = (val: any) => {
    setPage(1);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onChange = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);

  const renderTable = () => {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "用户ID",
        dataIndex: "uid",
        key: "uid",
      },
      {
        title: "手机号码",
        dataIndex: "phone",
        key: "phone",
      },
      {
        title: "商品ID",
        dataIndex: "sid",
        key: "sid",
      },
      {
        title: "商品状态",
        dataIndex: "state",
        key: "state",
        render: (val: any) => {
          return sellStateMap[val + ""];
        },
      },
      {
        title: "收获地址",
        dataIndex: "shipping_address",
        key: "shipping_address",
      },
      {
        title: "卖家ID",
        dataIndex: "vendor_uid",
        key: "vendor_uid",
      },
      {
        title: "商品数量",
        dataIndex: "shop_count",
        key: "shop_count",
      },
      {
        title: "支付方式",
        dataIndex: "buy_method",
        key: "buy_method",
        render: (text: string | number) => {
          return methodMap[text + ""];
        },
      },
      {
        title: "购买日期",
        dataIndex: "create_time",
        key: "create_time",
        render: (text: any) => {
          return dayjs(text).format(`YYYY-MM-DD HH:mm`);
        },
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
          total: total,
          onChange: onChange,
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
      {renderForm()} {renderTable()}
    </div>
  );
};

export default Order;
