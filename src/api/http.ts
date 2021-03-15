import axios from "axios";
import { apiUrl } from '../constant'; 
import { getRequest, HttpResponse, httpError } from 'http-optimize';
import { handleResponse, handleRequest } from './utils';
 
const service = axios.create({
  baseURL: apiUrl,
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    return handleRequest(config)
  },
  err => {
    Promise.reject(err)
  }
)


service.interceptors.response.use(
  response => {
    HttpResponse(response);
    return handleResponse(response);
  },
  error => {
    httpError(error);
  }
);

export default getRequest(service, {
  responseCache: (data:any) => {
    return data.data
  }
});
