import request from "../http";

export const getList = (params: object) => {
  return request({
    url: `/order/all/list`,
    method: "get",
    params,
  });
};
