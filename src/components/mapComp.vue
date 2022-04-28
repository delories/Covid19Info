<template>
  <div>
      <p class="title">
            <i></i> 疫情地图
        </p>
      <div id="chinaMap"></div>
  </div>
</template>

<script>
export default {
    name:'mapComp',
    data(){
        return {
            cityMapData:[],
            cityMapLegendData:[
                {name:"0",color:"#FFFAF0"},
                {name:"1-9",color:"#FFE4B5"},
                {name:"10-99",color:"#FFD700"},
                {name:"100-499",color:"#FF8C00"},
                {name:"500-9999",color:"#FF0000"},
                {name:">10000",color:"#80000"},
            ],
            //dangerLevel:['低风险','中风险，高风险'],
        }
    },
    mounted(){
        this.getMapApiData();
        window.onresize = function() {
            if(this.myChart)
                this.myChart.resize()
        }
        this.$bus.$on("refresh",(refresh)=>{
            if(refresh==true){
                this.getMapApiData();
                //this.$bus.$emit("refresh",false);
            }
        })
    },
    methods:{
        getMapApiData(){
            this.$api.getProvienceInfo().then(
                res=>{
                console.log(res);
              //console.log('provinceRes'+JSON.stringify(res));
              //var list=res.showapi_res_body.todayDetailList;

                for(var i=0;i<res.showapi_res_body.todayDetailList.length;i++){
                    var info = {
                        name: this.provienceNameFilter(res.showapi_res_body.todayDetailList[i].provinceName),
                        value: res.showapi_res_body.todayDetailList[i].currentConfirmedNum,
                        itemStyle: {
                            normal: {
                                areaColor: this.setColor(Number(res.showapi_res_body.todayDetailList[i].currentConfirmedNum))
                            }
                        }
                    };
                  //console.log(info.name);
                  this.cityMapData.push(info);
                }
              //console.log(this.cityMapData);
                this.$charts.chinaMap('chinaMap',this.cityMapData);
                //this.$charts.chinaMap('chinaMapp',this.cityMapData);
              //this.$charts.chinaMapLegend('chinaMap',this.cityMapLengendData);
              //console.log(Object.prototype.toString.call(this.provienceData));
            }
        )},
        setColor(value) {
            let currentColor = "";
            switch (true) {
                case value == 0:
                    currentColor = "#FFFAF0";
                    break;
                case value > 0 && value < 10:
                    currentColor = "#FFE4B5";
                    break;
                case value >= 10 && value < 100:
                    currentColor = "#FFD700";
                    break;
                case value >= 100 && value < 500:
                    currentColor = "#FF8C00";
                    break;
                case value >= 500 && value < 10000:
                    currentColor = "#FF0000";
                    break;
                default:
                    currentColor="#800000";
                    break;
            }
            return currentColor;
        },
        provienceNameFilter(str){
            //var newStr='';
            var words1="省";
            var words2="市";
            var words3="自治区";
            var words4="壮族自治区";
            var words5="回族自治区";
            var words6="维吾尔自治区";
            //str=Array.from(str);
            if(str.length<=3){
                let idx1=str.indexOf(words1);
                let idx2=str.indexOf(words2)
                if(idx1!=-1){
                    str=str.slice(0,idx1);
                }else if(idx2!=-1){
                    str=str.slice(0,idx2)
                }
            }else if(str.length==4){
                let idx=str.indexOf(words1);
                if(idx!=-1){
                    str=str.slice(0,idx);
                }
            }else if(str.length<=6){
                let idx=str.indexOf(words3);
                if(idx!=-1){
                    str=str.slice(0,idx);
                }
            }else if(str.length==7){
                let idx1=str.indexOf(words4);
                if(idx1!=-1){
                    str=str.slice(0,idx1);
                }else{
                    let idx2=str.indexOf(words5);
                    str=str.slice(0,idx2);
                }
            }else{
                let idx=str.indexOf(words6);
                if(idx!=-1){
                    str=str.slice(0,idx);
                }
            }
            return str;
        }
    }
}
</script>

<style scoped>
#chinaMap{
    width:100%;
    height:50vh;
}
.title {
    border-top: 0.005rem solid #ebebeb;
    border-bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: start;
    -ms-flex-pack: start;
    justify-content: flex-start;
    height: 0.44rem;
    padding: 0 0.16rem;
    font-weight: 500;
    font-size: 0.17rem;
    line-height: 0.44rem;
    background: #fff;
}
.title::before{
    content:"";
    width: 5px;
    height: 20px;
    background: #4169e2;
    margin-right: 10px;
}
</style>