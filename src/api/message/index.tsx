import request from "../http";

export const getList = (params: object) => {
  return request({
    url: "/shop/all/message",
    method: "get",
    params,
  });
};
