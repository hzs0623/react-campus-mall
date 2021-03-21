
import Layout from "../layouts/layout";
import shopManagement from '../views/shop/shopManagement';
import UserInfo from "../views/user/userInfo";
import Login from "../views/system/login";
import Home from "../views/home";
import ShopCart from "../views/shopCart";
import ShopMessage from "../views/shopMessage";
import Order from "../views/order";

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
      },
      {
        path: "/shop/management",
        component: shopManagement,
      },
      {
        path: "/shop/cartList",
        component: ShopCart,
      },
      {
        path: "/message/list",
        component: ShopMessage,
      },
      {
        path: "/order/list",
        component: Order,
      },
      {
        path: "/home",
        component: Home,
      }
    ],
    auth: true
  },
];

export default routerConfig;
