<template>
  <div class="case-num">
      <div class="container">
          <div>
              <p class="tittle"><span><i>截至{{caseNumData.modifyTime|timeFilter}}全国统计</i></span><span class="refresh" @click="refresh"><i class="el-icon-refresh"></i>刷新</span></p>

          </div>
      </div>
      <div class="num">
          <ul class="count">
              <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(247,76,49)">{{caseNumData.currentConfirmedIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(247,76,49)">{{caseNumData.currentConfirmedCount}}</strong>
                      <span>现存确诊</span>
                  </div>
              </li>
              <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(174,33,44)">{{caseNumData.seriousIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(174,33,44)">{{caseNumData.seriousCount}}</strong>
                      <span>现存无症状</span>
                  </div>
              </li>
              <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(162,90,78)">{{caseNumData.suspectedIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(162,90,78)">{{caseNumData.suspectedCount}}</strong>
                      <span>累计境外输入</span>
                  </div>
              </li>
            <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(247,130,7)">{{caseNumData.confirmedIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(247,130,7)">{{caseNumData.confirmedCount}}</strong>
                      <span>累计确诊</span>
                  </div>
              </li>
              <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(40,183,163)">{{caseNumData.curedIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(40,183,163)">{{caseNumData.curedCount}}</strong>
                      <span>累计治愈</span>
                  </div>
              </li>
              <li>
                  <div class="create-item">
                      <div class="create-count">
                          <b>
                              较昨日
                              <em style="color:rgb(93,112,146)">{{caseNumData.deadIncr|addFilter}}</em>
                          </b>
                      </div>
                      <strong style="color:rgb(93,112,146)">{{caseNumData.deadCount}}</strong>
                      <span>累计死亡</span>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>

export default {
    name:'caseNumComp',
    data(){
        return {
            //time:new Date(this.caseNumData.modifyTime),
        }
    },
    filters:{
        timeFilter(modifyTime){//时间解析成yyyy-mm-ss格式
            var time=new Date(modifyTime);
            //console.log(time);
            //console.log(time.getDate());
            var day=Number(time.getDate())<10?'0'+time.getDate():time.getDate();
            var year=time.getFullYear();
            var month=Number(time.getMonth())+1<10?'0'+(time.getMonth()+1):time.getMonth()+1;
            var hh=Number(time.getHours())<10?'0'+time.getHours():time.getHours();
            var mm=Number(time.getMinutes())<10?'0'+time.getMinutes():time.getMinutes();
            var ss=Number(time.getSeconds());
            return year+'-'+month+'-'+day+' '+hh+':'+mm+'\''+ss;
        },
        addFilter(num){
           if(num>0){
                return '+'+num;
            }else return num;
        }
    },
    props:{
        caseNumData:{
            type:Object,
            default:function (){
                return {}
            }
        }
    },
    methods:{
        refresh(){
            //alert("refresh");
            this.$bus.$emit("refresh",true);
        }
    }
}
</script>

<style scoped>
.case-num {
    padding: 0.16rem;
    background: #fff;
}
.container {
    margin: -0.16rem 0 0;
    font-size: 0.12rem;
}

.tittle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.08rem 0 0.07rem;
    line-height: 0.24rem;
}
.title em {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 0.24rem;
    margin-right: -0.16rem;
    padding: 0 0.08rem;
    color: #666;
    font-style: normal;
    background-color: #f7f7f7;
    border-radius: 0.12rem 0 0 0.12rem;
}
.title em img {
    width: 0.123rem;
    height: 0.123rem;
    margin-right: 0.037rem;
}
.tittle::before{
    content:" ";
    width:5px;
    height:15px;
    background-color:#4169e2 ;
    margin-left:0px;
}
.refresh{

}
.num {
    position: relative;
    text-align: center;
    background: #fff;
}
.num::after {
    position: absolute;
    top: -0.01rem;
    left: -0.01rem;
    display: block;
    width: 200%;
    height: 200%;
    border: 0.01rem solid #ebebeb;
    border-radius: 0.08rem;
    box-shadow: 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.05);
    transform: scale(0.5);
    transform-origin: 0 0;
    content: "";
}
.num ul {
    flex-flow: wrap;
    position: relative;
    display: flex;
    margin: 0;
    padding: 0.08rem 0 0.12rem;
}
.num ul li {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 33.3333333%;
    margin: 10px 0;
}
.num ul li .create-item {
    position: relative;
    text-align: center;
}
.num ul li .create-item .create-count {
    display: flex;
    align-items: center;
    height: 0.12rem;
    margin-bottom: 0.02rem;
    color: #666;
    font-weight: 400;
    font-size: 0.09rem;
}
.num ul li .create-item .create-count em {
    font-weight: 400;
    font-style: normal;
}
.num ul li strong {
    margin-bottom: 0.01rem;
    font-weight: 700;
    font-size: 0.2rem;
    line-height: 0.25rem;
}
.num ul li span {
    display: block;
    color: #333;
    font-weight: 700;
    font-size: 0.11rem;
    line-height: 0.15rem;
}
</style>