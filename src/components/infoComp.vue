<template>
  <div class="info">
      <p class="tittle">
          <i></i>
          <!--病毒信息-->
      </p>
      <div class="content">
          <!--
          <p>{{infoData.remark1}}</p>
          <p>{{infoData.remark2}}</p>
          <p>{{infoData.remark3}}</p>
          <p>{{infoData.note1}}</p>
          <p>{{infoData.note2}}</p>
          <p>{{infoData.note3}}</p>-->
      </div>
  </div>
</template>

<script>
export default {
    name:"infoCamp",
    props:{
        infoData:{
            type:Object,
            default:function(){
                return {};
            }
        }
    }

}
</script>

<style scoped>
.info{

}
</style>