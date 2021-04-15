export const ENV = process.env.NODE_ENV;  // development ||  production

export const pro_token:string = "pro_token"; // token变量

export const getToken:any = (() => {
  try {
    const data = window.localStorage.getItem(pro_token) || '';
    return JSON.parse(data).token || '';
  } catch(e) {
    return '';
  }
})();

export const apiUrl:string = ENV === 'production' ? `http://121.4.113.48:3333` : 'http://127.0.0.1:3333'; // api url

interface MethodMap {
  [propName: string]: string;
}
// 支付方式map
export const methodMap: MethodMap = {
  '0': '货到付款',
  '1': '微信',
  '2': '支付宝',
  '3': '线下支付'
}

// 购物状态
export const sellStateMap:MethodMap = {
  1: '发货中',
  2: '已发货，待收货',
  3: "交易完成"
}

interface AdminState {
  [propName: string]: string;
}

export const adminStateMap: AdminState = {
  '1': '普通用户',
  '2': '管理员',
  '3': '超级管理员',
}
