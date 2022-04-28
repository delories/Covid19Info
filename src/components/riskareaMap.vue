<template>
<div>
    <div id="riskMap">

    </div>
</div>

</template>

<script>
export default {
    name:"riskareaMap",
    data(){
        return {

        };
    },
    mounted(){
        this.init();
    },
    props:{
        cityData:{
            type:Array,
            default(){
                return [];
            }
        }
    },
    methods:{
        init(){
            var name=this.$route.params.name;
            this.$charts.provienceMap('riskMap',name,this.cityData);
        }
    },
    watch:{
        //监听 cityData的变化
        cityData(){
            this.$nextTick(()=>{
                this.init();//数据到来且DOM渲染完成后立即执行更新Map
            })
        }
    }
}
</script>

<style scoped>
#riskMap{
    width:100vw;
    height:50vh;
}
</style>