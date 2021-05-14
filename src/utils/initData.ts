
export  interface Sex {
  [propName: string]: any //定义了任意属性,取 string 类型,属性值取any类型。
}
// 性别
export const sexData: Sex = {
  0: "未填写",
  1: "男",
  2: "女",
}