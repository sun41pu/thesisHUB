import axios, { AxiosInterceptorOptions } from "axios";

const api = axios.create({
  baseURL: '/api',
  withCredentials: true
})

export function handleRequest(path: string, options?) {
  return api(path, options)
    .then((response) => response.data)
    .catch((error) => 
      Promise.reject(error?.response?.data ?? error))
}
