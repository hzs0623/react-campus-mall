import request from '../http';

export function getList(params: object) {
  return request({
    url: `/shop/cart/allList`,
    method: 'get',
    params
  })
}
