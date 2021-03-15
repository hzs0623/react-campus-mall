import request from '../http';

export function getList(params: object) {
  return request({
    url: `/shop/list`,
    method: 'get',
    params
  })
}
