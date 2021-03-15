export const pro_token:string = "pro_token"; // token变量

export const apiUrl:string =  `http://121.4.113.48:3333`; // api url

// 支付方式map
export const methodMap:object = {
  0: '货到付款',
  1: '微信',
  2: '支付宝',
  3: '线下支付'
}

export const sellStateMap:object = {
  1: '发货中',
  2: '已发货，待收货',
  3: "交易完成"
}
