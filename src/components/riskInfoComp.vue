<template>
  <div>
      <div id="riskAreaInfo">
          <h2>高风险地区数：{{info.highRisk.nums}}</h2>
          <h2 >中风险地区数：{{info.middleRisk.nums}}</h2>
          <div class="list" v-for="item in info.highRisk.list" :key="item.areaName">
              <span class="cityName">{{item.cityName}}</span><span class="areaName">{{item.areaName}}</span><span class="label highRisk">{{item.riskLevel}}</span>
          </div>
          <div class="list" v-for="item in info.middleRisk.list" :key="item.areaName">
              <span class="cityName">{{item.cityName}}</span><span class="areaName">{{item.areaName}}</span><span class="label midRisk">{{item.riskLevel}}</span>
          </div>
      </div>
  </div>
</template>

<script>
export default {
    name:'riskInfoComp',
    data(){
        return {

        };
    },
    props:{
        info:{
            type:Object,
            default(){
                return {};
            }
        }
    },
    mounted(){
        //console.log('info');
        //console.log(info);
    }
}
</script>

<style scoped>
#riskAreaInfo{
    width:100vw;
}
h2{
    font-size:2vh;
    text-align: center;
    border: 0.01rem solid #fefdfdd2;
    border-radius: 0.08rem;
    box-shadow: 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.05);
}
.list{
    font-size:2vh;
    padding:1px;
    display:flex;
    text-align:center;
    overflow: auto;
    height:2.5vh;
    line-height: 2.5vh;
}
.cityName{
    width:15%;
    float:left;
}
.label{
    float:right;
    width:5%;
    font-weight: bold;
    margin-right:2vw;
}
.areaName{
    text-align:left;
    flex:1;
    margin-left:2vw;
}
.midRisk{
    color:#FF8C00;
}
.highRisk{
    color:#FF0000;
}
</style>