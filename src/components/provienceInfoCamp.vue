<template>
      <div class="textInfo">
          <div class="row">
              <span class="name">{{info.provienceName}}</span>
              <div class="text">
                  <div class="create-item">
                      <div class="create-count">
                      </div>
                      <strong style="color:#FF0000;">{{info.currentConfirmed}}</strong><br>
                      <span>现存确诊</span>
                  </div>
                  <div class="create-item">
                      <div class="create-count">
                      </div>
                      <strong style="color:#FF8C00">{{info.confirmed}}</strong><br>
                      <span>累积确诊</span>
                  </div>
                  <div class="create-item">
                      <div class="create-count">
                      </div>
                      <strong style="color:#FF8C00">{{info.otherCountryInput}}</strong><br>
                      <span>境外输入</span>
                  </div>
              </div>
          </div>
<!--
              <div class="row">
                  <div class="create-item">
                      <div class="create-count">
                      </div>
                      <strong style="color:#FF0000;">{{info.countryInput.confirmedNum}}</strong><br>
                      <span>省外输入</span>
                  </div>
                  <div class="create-item">
                      <div class="create-count">
                      </div>
                      <strong style="color:#FF0000;">{{info.unknow}}</strong><br>
                      <span>未明确</span>
                  </div>
              </div>-->
    </div>
</template>

<script>
export default {
    name:'provienceInfoCamp',
    data(){
        return {};
    },
    props:{
        info:{
            type:Object,
            default(){
                return {};
            }
        }
    }
}
</script>

<style scoped>

.textInfo{
    /*display:flex;*/
    width:100%;
    height:10vh;
    background-color: #fefdfd;
    border: 0.01rem solid #fefdfdd2;
    border-radius: 0.08rem;
    box-shadow: 0 0.04rem 0.12rem 0 rgba(0, 0, 0, 0.05);
}
.name{
    width:25%;
    height:10vh;
    padding:5px;
    line-height: 10vh;
    font-size:3vh;
    font-weight: 900;
    color:black;
}
.text{
    display:flex;
    padding:2vh;
    width:75%;
    height:10vh;
    justify-content: space-around;
    align-items: center;
    font-size:2vh;
}
.create-item {
    /*position: relative;*/
    text-align: center;
    /*width:30%;*/
    height:10vh;
    font-weight: 400;
    font-size: 2vh;
}
.create-item .create-count {
    display: flex;
    align-items: center;
    height: 0.12rem;
    margin-bottom: 0.02rem;
    color: #666;
}
strong {
    margin-bottom: 0.01rem;
    font-weight: 700;
    font-size: 3vh;
    line-height: 0.25rem;
}
.row{
    display:flex;
}
</style>