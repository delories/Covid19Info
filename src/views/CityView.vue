<template>
  <div>
    <provienceInfoCamp :info="provienceInfo"/>
    <riskareaMap :cityData="cityData"/>
    <riskInfoComp :info="riskInfo"/>
  </div>
</template>

<script>
import riskInfoComp from '../components/riskInfoComp.vue'
import riskareaMap from '../components/riskareaMap.vue'
import provienceInfoCamp from '../components/provienceInfoCamp.vue'
export default {
    name:'CityView',
    components:{
        riskInfoComp,
        riskareaMap,
        provienceInfoCamp,
    },
    data(){
        return{
            cityData:[],
            riskInfo:{
                highRisk:{
                    nums:0,
                    list:[]
                },
                middleRisk:{
                    nums:0,
                    list:[]
                },
            },
            provienceInfo:{
                provinceName:'',
                currentConfirmed:0,
                confirmed:0,
                otherCountryInput:0,
                unknow:0,
                countryInput:{
                    name:'',
                    confirmedNum:0,
                },
            }
        }
    },
    created(){
        //console.log('info');
        //console.log(this.info);
        //console.log(this.$route.params.name);
        this.getProvienceMapApiData();
    },
    methods:{
        getProvienceMapApiData(){
            this.provienceInfo.provienceName=this.$route.params.name;
            var name=this.$route.params.name;
            this.$api.getProvienceInfo().then(
                res=>{
                    console.log(res);
                    for(var i=0;i<res.showapi_res_body.todayDetailList.length;i++){
                        if(this.nameComp(name,res.showapi_res_body.todayDetailList[i].provinceName)){
                            this.provienceInfo.currentConfirmed=res.showapi_res_body.todayDetailList[i].currentConfirmedNum;
                            this.provienceInfo.confirmed=res.showapi_res_body.todayDetailList[i].confirmedNum;
                            for(let j=0;j<res.showapi_res_body.todayDetailList[i].cityList.length;j++){
                                //获取区域数据类别
                                var cityname=res.showapi_res_body.todayDetailList[i].cityList[j].cityName;
                                //获取境外输入 国内输入 待明确的数据 存入provienceInfo
                                if(cityname=="境外输入人员"||cityname=="境外输入"){
                                    this.provienceInfo.otherCountryInput=res.showapi_res_body.todayDetailList[i].cityList[j].confirmedNum;
                                    continue;
                                }else if(cityname=="待明确"||cityname=="待明确地区"){
                                    this.provienceInfo.unknow=res.showapi_res_body.todayDetailList[i].cityList[j].confirmedNum;
                                    continue;
                                }else if(cityname.indexOf("输入")!=-1){
                                    this.provienceInfo.countryInput.confirmedNum=res.showapi_res_body.todayDetailList[i].cityList[j].confirmedNum;
                                    this.provienceInfo.countryInput.name=cityname;
                                    continue;
                                }
                                //获取总的中高风险地区数量
                                this.riskInfo.highRisk.nums+=res.showapi_res_body.todayDetailList[i].cityList[j].highDangerNum;
                                this.riskInfo.middleRisk.nums+=res.showapi_res_body.todayDetailList[i].cityList[j].midDangerNum;
                                //获取画地区图所需要的数据
                                var city={
                                    name:this.cityNameComp(name,res.showapi_res_body.todayDetailList[i].cityList[j].cityName),
                                    value:res.showapi_res_body.todayDetailList[i].cityList[j].midDangerNum+res.showapi_res_body.todayDetailList[i].cityList[j].highDangerNum,
                                    itemStyle: {
                                        normal: {
                                            areaColor: this.setColor(Number(res.showapi_res_body.todayDetailList[i].cityList[j].midDangerNum+res.showapi_res_body.todayDetailList[i].cityList[j].highDangerNum))
                                        }
                                    }
                                }
                                //console.log(city.name,city.value);
                                this.cityData.push(city);
                            }
                            //获取风险地区数据
                            for(let k=0;k<res.showapi_res_body.todayDetailList[i].dangerAreas.length;k++){
                                if(res.showapi_res_body.todayDetailList[i].dangerAreas[k].dangerLevel==1){//高风险
                                    var dangerArea={
                                        cityName:res.showapi_res_body.todayDetailList[i].dangerAreas[k].cityName,
                                        areaName:res.showapi_res_body.todayDetailList[i].dangerAreas[k].areaName,
                                        riskLevel:"高"
                                    };
                                    this.riskInfo.highRisk.list.push(dangerArea);
                                }else if(res.showapi_res_body.todayDetailList[i].dangerAreas[k].dangerLevel==2){//中风险
                                    var midArea={
                                        cityName:res.showapi_res_body.todayDetailList[i].dangerAreas[k].cityName,
                                        areaName:res.showapi_res_body.todayDetailList[i].dangerAreas[k].areaName,
                                        riskLevel:"中"
                                    }
                                    this.riskInfo.middleRisk.list.push(midArea);
                                }
                            }
                        }
                    }
                    console.log(this.cityData);
                    //this.$charts.provienceMap('city',name,this.cityData);
                    console.log('cityMap渲染好了');
                }
            );
        },
        setColor(value) {
            let currentColor = "";
            switch (true) {
                case value == 0:
                    currentColor = "#FFFAF0";
                    break;
                case value > 0 && value < 2:
                    currentColor = "#FFE4B5";
                    break;
                case value >= 2 && value < 6:
                    currentColor = "#FFD700";
                    break;
                case value >= 6 && value < 11:
                    currentColor = "#FF8C00";
                    break;
                case value >= 11 && value < 21:
                    currentColor = "#FF0000";
                    break;
                default:
                    currentColor="#800000";
                    break;
            }
            return currentColor;
        },
        nameComp(str1,str2){
            var ans=true;
            for(let i=0;i<2;i++){
                if(str1[i]!=str2[i]){
                    ans=false;
                    break;
                }
            }
            return ans;
        },
        cityNameComp(provience,cityName){
            var list1=["上海","北京","澳门","台湾","香港"];
            var words=["市","地区","盟","自治州","区"];
            var add1=["大兴安岭"];
            var change=true;
            for(let i=0;i<words.length;i++){
                if(cityName.indexOf(words[i])!=-1){
                    change=false;
                    continue;
                }
            }
            if(change){
                if(list1.indexOf(provience)!=-1)
                    cityName+="区";
                else {
                        if(add1.indexOf(cityName)!=-1){
                            cityName+="地区";
                        }else{
                        cityName+="市";
                        }
                    }
            }
            return cityName;
        }
    }

}
</script>
<style scoped>

</style>