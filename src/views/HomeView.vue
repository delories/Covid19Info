<template>
  <div class="home">
      <headerComp/>
      <infoComp v-bind:infoData="infoData"/>
      <caseNumComp v-bind:caseNumData="caseNumData"/>
      <mapComp/>
      <newsComp v-bind:newsList="news" />
      <footerComp/>
     <!--<mapComp v-bind:provienceData="provienceData"/>
         {{provienceData}}-->
  </div>
</template>

<script>
// @ is an alias to /src
import headerComp from '../components/headerComp.vue'
import infoComp from '../components/infoComp.vue'
import caseNumComp from '../components/caseNumComp.vue'
import mapComp from '../components/mapComp.vue'
import newsComp from '../components/newsComp.vue'
import footerComp from '../components/footerComp.vue'
export default {
  name: 'HomeView',
  components: {
      headerComp,
      infoComp,
      caseNumComp,
      mapComp,
      newsComp,
      footerComp,
  },
  data(){
      return {
          infoData:{},
          caseNumData:{},
          dateTime:new Date(),
          refresh:false,
          news:[],
      }
  },
  created(){
      this.getApiData();
      this.$bus.$on("refresh",(refresh)=>{
          if(refresh==true){
              this.dateTime=new Date();
              this.getApiData();
          }
      })
  },
  methods:{
      getApiData(){
          this.$api.getDataInfo({
          key:"5e247274cc6513c1e5d8cf15e07e1c6c",
          date:this.dateTime,
        }).then(res=>{
            console.log(res);
          //console.log(new Date(this.dateTime));
            this.infoData={
            }
            console.log(res.newslist[0].news);
            for(let i=0;i<res.newslist[0].news.length;i++){
                var aNew={
                    id:res.newslist[0].news[i].id,
                    title:res.newslist[0].news[i].title,
                    summary:res.newslist[0].news[i].summary,
                    infoSource:res.newslist[0].news[i].infoSource,
                    pubDate:res.newslist[0].news[i].pubDate,
                    //pubDateStr:res.newslist[0].news[i].pubDateStr,
                    sourceUrl:res.newslist[0].news[i].sourceUrl,
                }
                this.news.push(aNew);
            }
          //console.log(res);
          //console.log(this.infoData);
            this.caseNumData={
                modifyTime:this.dateTime,//统计时间

                currentConfirmedCount:res.newslist[0].desc.currentConfirmedCount,//现存确诊
                currentConfirmedIncr:res.newslist[0].desc.currentConfirmedIncr,//现存确诊新增

                confirmedCount:res.newslist[0].desc.confirmedCount,//累计确诊
                confirmedIncr:res.newslist[0].desc.confirmedIncr,//累计确诊新增

                suspectedCount:res.newslist[0].desc.suspectedCount,//累计境外输入
                suspectedIncr:res.newslist[0].desc.suspectedIncr,//境外输入新增

                highDangerCount:res.newslist[0].desc.highDangerCount,//国内高风险地区个数
                midDangerCount:res.newslist[0].desc.midDangerCount,//国内中风风险地区个数

                seriousCount:res.newslist[0].desc.seriousCount,//现存无症状
                seriousIncr:res.newslist[0].desc.seriousIncr,//无症状新增

                curedCount:res.newslist[0].desc.curedCount,//累计治愈
                curedIncr:res.newslist[0].desc.curedIncr,//治愈新增

                deadCount:res.newslist[0].desc.deadCount,//累计死亡
                deadIncr:res.newslist[0].desc.deadIncr,//死亡新增
            }
          //console.log(this.caseNumData.modifyTime);
          //console.log(this.caseNumData);
        });
      }
  }
}
</script>
