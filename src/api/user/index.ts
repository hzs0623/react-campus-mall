import request from '../http';

export function getList(params: object) {
  return request({
    url: `/user/list`,
    method: 'get',
    params
  })
}

export function userEdit(data: object) {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export function userDelete(data: object) {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
