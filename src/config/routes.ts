
import Layout from "../layouts/layout";
import shopManagement from '../views/shop/shopManagement';
import UserInfo from "../views/user/userInfo";
import Login from "../views/system/login";
import Home from "../views/home";

export interface interfaceRouter {
  component?: any;
  children?: any;
  key?: any;
  redirect?: any;
  path?: any;
  auth?: boolean // 登录
}

const routerConfig: interfaceRouter[] = [
  {
    path: '/login',
    component: Login
  },
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "/user/info",
        component: UserInfo,
        auth: true
      },
      {
        path: "/shop/management",
        component: shopManagement,
        auth: true
      },
      {
        path: "/home",
        component: Home,
        auth: true
      }
    ],
   
  },
];

export default routerConfig;
