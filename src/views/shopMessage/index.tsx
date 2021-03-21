import React, { useState, useEffect } from "react";
import { Form, Card, Input, Button, Table } from "antd";
import { getList as getListMeg } from "../../api/message";
import dayjs from "dayjs";
import "./index.less";

const Message: React.FC = () => {
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
      const res = await getListMeg({
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

  const onChange = (page: number) => {
    setPage(page);
  };

  const renderTable = () => {
    const columns = [
      {
        title: "id",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "留言内容",
        dataIndex: "content",
        key: "content",
        ellipsis: true,
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
        title: "发布日期",
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

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [curPage]);

  return (
    <div>
      {renderForm()}
      {renderTable()}
    </div>
  );
};

export default Message;
