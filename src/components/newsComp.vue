<template>
  <div class="news">
      <div class="card">
          <ul class="list">
              <li class="item" v-for="(item,idx) in newsList" :key="idx">
                  <div class="tag">{{item.pubDate|getPublicDateStr}}</div>
                  <div class="content">
                      <div class="title">{{item.title}}</div>
                      <p>{{item.summary}}</p>
                  </div>
                  <a :href="item.sourceUrl">&gt;</a>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
export default {
    name:'newsComp',
    data(){
        return {

        };
    },
    props:{
        newsList:{
            type:Array,
            default:function(){
                return [];
            },
        }
    },
    filters:{
        getPublicDateStr(publicDate){
            var nowTime=new Date();
            var oldTime=new Date(publicDate);
            var returnStr='';
            var diffYear=nowTime.getFullYear()-oldTime.getFullYear();
            if(diffYear!=0){
                returnStr=diffYear.toString()+'年前';
            }else{
                var diffMonth=nowTime.getMonth()-oldTime.getMonth();
                if(diffMonth!=0){
                    returnStr=diffMonth.toString()+'月前';
                }else{
                    var diffDay=nowTime.getDate()-oldTime.getDate();
                    if(diffDay!=0){
                        returnStr=diffDay.toString()+'天前';
                    }else{
                        var diffHour=nowTime.getHours()-oldTime.getHours();
                        if(diffHour!=0){
                            returnStr=diffHour.toString()+'小时前';
                        }else{
                            var diffMins=nowTime.getMinutes()-oldTime.getMinutes();
                            if(diffMins!=0){
                                returnStr=diffMins.toString()+'分钟前';
                            }else{
                                var diffSecs=nowTime.getSeconds()-oldTime.getSeconds();
                                returnStr=diffSecs.toString()+'秒前';
                            }
                        }
                    }
                }
            }
            return returnStr;
        }

    }
}
</script>

<style scoped>
.news {
    padding: 0.12rem 0.16rem;
    font-size: 0.12rem;
    background-color: #fff;
}

.header {
    margin-bottom: 0.08rem;
    color: #333;
    font-weight: 700;
    font-size: 0.16rem;
    line-height: 0.225rem;
}
.card {
    border-radius: 0.04rem;
    border: 0.005rem solid #ebebeb;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0.02rem 0.06rem 0 rgba(0, 0, 0, 0.05);
}

.item {
    display: flex;
    justify-content: space-between;
    padding: 0.15rem 0.16rem;
    border-bottom: 1px solid #f1f1f1;
}

.tag {
    display: flex;
    flex: none;
    align-items: center;
    height: 0.17rem;
    margin-top: 0.02rem;
    padding: 0 0.04rem;
    border-radius: 0.02rem;
    background-color: #f74c31;
    color: #fff;
    font-weight: 700;
    font-size: 0.12rem;
}
.content {
    display: flex;
    flex: auto;
    flex-direction: column;
    justify-content: center;
    margin: 0 0.07rem;
}
.title {
    color: #333;
    font-weight: 700;
    font-size: 0.16rem;
    line-height: 0.225rem;
}
.content p {
    margin-top: 0.03rem;
    color: #999;
    font-weight: 400;
    font-size: 0.12rem;
    line-height: 0.17rem;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

img {
    flex: none;
    align-self: center;
    width: 0.12rem;
    height: 0.12rem;
}
</style>