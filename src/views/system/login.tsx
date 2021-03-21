import React from 'react';
import "./index.less";
import { Button, Form, Input, notification, message } from "antd";
import { login }  from '../../api/system';
import store from '../../redux';
import { setUser } from '../../redux/actions';
import { pro_token } from '../../constant';

const Login = (props:any) =>  {
  const [form] = Form.useForm();

  const submit =async (values: any) => {
    const res = await login(values);

    const { admin_state = 1 } = res || {};
    if(!admin_state || admin_state < 2) {
      message.warning('当前用户无权限登录')
      return;
    }
    localStorage.setItem(pro_token, JSON.stringify(res));
    
    setUser(res)(store.dispatch);
    props.history.push('/home');
    notification['success']({
      message: 'success',
      description:'login success',
    });
  }

  const onReset = () => {
    form.resetFields();
  }
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const layoutForm = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

    return (
      <div className="login-page">
        <div className="box">
          <Form {...layoutForm } name="normal-login" form={form} onFinish={submit}>
            <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                登 录
              </Button>
              <Button htmlType="button" className="reset" onClick={onReset}>
                Reset
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
}

export default Login;
