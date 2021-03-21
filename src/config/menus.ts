import {
  SendOutlined,
  UserOutlined,
  MessageFilled,
  ShoppingCartOutlined,
  ShopFilled
} from '@ant-design/icons';

export interface ChildrenMenu {
  path: string;
  name?: string;
  icon?: any
}

export interface Menu {
  path: string;
  name?: string;
  icon?: any; // 图标
  children?: ChildrenMenu[]; // 子菜单
  external?: boolean; // 是否是外链
  newWindow?: boolean; // 外链是否新开窗口，之后 external 为 true 才有效
}

const menuConfig: Menu[] = [
  {
    name: '用户管理',
    path: '/user',
    icon: UserOutlined,
    children: [
      {
        path: '/user/info',
        name: '用户列表',
      },
    ]
  },
  {
    name: '商品管理',
    path: '/shop',
    icon: ShopFilled,
    children: [
      {
        path: '/shop/management',
        name: '商品列表',
      },
    ]
  },
  {
    name: '留言管理',
    path: '/message',
    icon: MessageFilled,
    children: [
      {
        path: '/message/list',
        name: '留言列表',
      }
    ]
  },
  {
    name: '订单管理',
    path: '/order',
    icon: SendOutlined,
    children: [
      {
        path: '/order/list',
        name: '订单列表',
      }
    ]
  },
  {
    name: '购物车管理',
    path: '/shop/cart',
    icon: ShoppingCartOutlined,
    children: [
      {
        path: '/shop/cartList',
        name: '购物车管理',
      }
    ]
  }
];

export default menuConfig;


