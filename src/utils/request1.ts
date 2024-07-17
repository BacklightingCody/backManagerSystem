import axios from 'axios'
import { getToken } from '@/utils/auth';
import qs from 'qs'; // 用于将对象转换为 x-www-form-urlencoded 格式

const instance = axios.create({
    // baseURL: 'http://ceshi13.dishait.cn/admin',
    baseURL:'/api',
    timeout: 5000,
    // headers: {
    //   'Content-Type': 'multipart/form-data'
    // }
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }]
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
   if(token){
    config.headers["token"] = token
   }
   console.log('请求配置:', config);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    if(response.status ===200){
      console.log(111)
    }
    if(response.status ===20000){
      console.log(555)
    }
    // 对响应数据做点什么
    return response.data;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      // 请求已发出，但服务器响应了状态码非 2xx
      // 可以根据状态码进行错误处理
    switch (error.response.status) {
      case 400:
        ElNotification({
          title: 'Error',
          message:error.response.data.msg,
          type: 'error',
          duration:3000,
      })
      break;
      case 401:
        // 未授权
        // 做一些处理，比如跳转到登录页
        break;
      case 403:
        // 禁止访问
        // 做一些处理，比如显示错误信息
        break;
      case 20000:
        console.log(222)
        break;
      
      // 其他状态码
      default:  
        // 其他错误处理
        ElNotification({
          title: 'Error',
          message:'请求错误',
          type: 'error',
          duration:3000,
      })
        break;
    }
  } else {
    // 请求未发出
    // 网络错误等
    console.log(333)
  }

    return Promise.reject(error);
  });




export default instance