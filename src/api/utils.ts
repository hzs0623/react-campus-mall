
import { message } from 'antd';
import store from '../redux';
import { getToken } from "../constant";

// 创建一个错误
function errorCreate(msg = '') {
  message.error(msg);
}

export const handleRequest = (config: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { method, params = {}, headers = {}, loading = true } = config;

  try {
    const authtoken = store.getState().global.token || getToken;

    if (method === 'get') {
      config.params = {
        ...params,
        _t: Date.now()
      }
    }
    config.headers = {
      ...headers,
      authtoken
    }

    return config;
  } catch (e) {
    Promise.reject(e)
  }
}

export const handleResponse = (response:any) => {
  const { data: axiosData } = response;
  const { code, msg = ' ', data = {} } = axiosData;
  switch (`${code}`) {
    case '1001':
      return data;
    case '1005': 
        // 登陆
      window.location.href = `${origin}/#/login`;
      return;
    default:
      errorCreate(`${msg}`);
      return Promise.reject(msg);
  }
}
