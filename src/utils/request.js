import axios from 'axios'
import qs from 'qs'

const errorHandle=(status,info)=>{
    switch(status){
        case 400:
            console.log('服务器收到客户端的请求报文，表示的格式正确，但服务器不知道什么意思');
            break;
        case 401:
            console.log('客户端试图对一个受保护的资源进行操作，却没有提供正确的认证证书');
            break;
        case 403:
            console.log('客户端请求的结构正确，但是服务器不想处理它');
            break;
        case 404:
            console.log('网络地址请求错误');
            break;
        case 500:
            console.log('执行请求处理代码时遇见异常');
            break;
        case 503:
            console.log('服务器暂时无法处理该请求');
            break;
        default:
            console.log(info);
            break;
    }
}
//创建axios的实例对象
const instance=axios.create({
    timeout:5000
})
//处理请求并发方法
instance.all=axios.all;
instance.spread=axios.spread;
//全局配置
instance.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded';
//请求拦截和相应拦截
instance.interceptors.request.use(
    config=>{
        if(config.method==='post'){
            config.data=qs.stringify(config.data);
        }
        return config;
    },
    error=>Promise.reject(error)
)
instance.interceptors.response.use(
    response=>response.status===200?Promise.resolve(response):Promise.reject(response),
    error=>{
        const{ response }=error;
        if(response){
            //错误信息以状态码为主
            errorHandle(response.status,response.data);
            return Promise.reject(response);
        }else{
            console.log('请求被中断');
        }
    }
)
//提供get 和post的请求方式
export function get(url,params){
    return new Promise((resolve,reject)=>{
        instance.get(url,{
            params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        })
    })
}
export function post(url,params){
    return new Promise((resolve,reject)=>{
        instance.post(url,{
            params
        }).then(res=>{
            resolve(res.data);
        }).catch(err=>{
            reject(err.data);
        })
    })
}

export default instance