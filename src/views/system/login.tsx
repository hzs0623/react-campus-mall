import React, {PureComponent} from 'react';
import "./index.less";
import { Button, Form, Input, notification } from "antd";
import { login }  from '../../api/system';
import store from '../../redux';
import { setUser } from '../../redux/actions';
import { pro_token } from '../../constant';

interface Actions {
  setUser: Function,
}

interface AppProps {
  actions: Actions,
  [propName: string]: any;
}

interface AppState {
  user?: string,
}

export default class Login extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = { };
  }

  submit =async (values: any) => {
    const res = await login(values)

    localStorage.setItem(pro_token, JSON.stringify(res));

    setUser(res)(store.dispatch);
    this.props.history.push('/home');
    notification['success']({
      message: 'success',
      description:'login success',
    });
  }
  

  render() {
    return (
      <div className="login-page">
        <div className="box">
          <Form name="normal-login" onFinish={this.submit}>
            <Form.Item label="username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ span: 16 , offset: 5 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}