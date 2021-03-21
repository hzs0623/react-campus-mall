import request from '../http';

export function getList(params: object) {
  return request({
    url: `/user/list`,
    method: 'get',
    params
  })
}
