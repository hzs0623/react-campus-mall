
import Layout from "../layouts/layout";
import shopManagement from '../views/shop/shopManagement';
import UserInfo from "../views/user/userInfo";

export interface interfaceRouter {
  component?: any;
  children?: any;
  key?: any;
  redirect?: any;
  path?: any;
}

const routerConfig: interfaceRouter[] = [
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
    ],
  },
];

export default routerConfig;
