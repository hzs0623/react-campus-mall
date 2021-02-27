import {
  SendOutlined,
  UserOutlined
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
        name: '用户大全',
      },
    ]
  },
  {
    name: '商品管理',
    path: '/shop',
    icon: SendOutlined,
    children: [
      {
        path: '/shop/management',
        name: '商品列表',
      }
    ]
  }
];

export default menuConfig;


