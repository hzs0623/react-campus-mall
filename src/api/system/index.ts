import request from '../http';

export const login = (data:any) => {
  return request({
    url: '/login',
    method: 'post',
    data,
  })
}

export const register = (data:object) => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}

export const userEdit = (data:object) => {
  return request({
    url: '/user/edit',
    method: 'post',
    data
  })
}

export const userInfo = (params:object) => {
  return request({
    url: '/user/find',
    method: 'get',
    params,
  })
}