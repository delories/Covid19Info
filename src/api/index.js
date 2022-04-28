import {get} from '../utils/request'
const api={
    getDataInfo(params){
        return get("http://api.tianapi.com/ncov/index",params);
    },
    getProvienceInfo(){
        return get("https://route.showapi.com/2217-2?showapi_appid=979222.0&showapi_sign=5731ccc92a464302b098963febda4c50");
    }
}
export default api;