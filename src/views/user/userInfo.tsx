import React, { PureComponent } from "react";
interface AppProps {
  // actions: Actions,
  [propName: string]: any;
}

interface AppState {
  page: number;
  pageSize: number;
  total: number;
  visible: boolean;
  list: Array<object>;
  logsArr: Array<Object>;
  customerList: Array<object>;
  statusList: Array<object>;
  employeeList: Array<object>;
  formData: FormData;
  loading: boolean;
}

export default class User extends PureComponent<AppProps, AppState> {
  render() {
    // const { page = 1, pageSize = 10, total = 0, visible = false } = this.state;
    return <div className="page-user">用户界面</div>;
  }
}
