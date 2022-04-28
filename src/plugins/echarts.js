/* eslint-disable no-mixed-spaces-and-tabs */
import echarts from 'echarts'

const echartMap =function(Vue){
    Object.defineProperties(Vue.prototype,{
        $charts:{
            get(){
                return {
                    chinaMap(id,cityData){

                        for(let i=0;i<cityData.length;i++){
                            console.log(i+cityData[i].name+cityData[i].value);
                        }
                        this.chart=echarts.init(document.getElementById(id));
                        /*function getFontSize(res){
    	                let clientWidth = window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;
                            if (!clientWidth) return;
                            let fontSize = 100 * (clientWidth / 1920);
                            console.log(res*fontSize);
                            return res*fontSize;
	                    }*/
                        var option={
                            tooltip:{
                                triggerOn:"click",
                                enterable:true,
                                formatter(data) {
                                    console.log(data.name+'  '+data.value);
                                    return "<div><p>"+data.name +":"+ "现存确诊:" + data.value + "</p><a style='color:blue;font-size:15' href='#/provienceMap/"+data.name+"'>查看详情</a></div>"
                                }
                            },
                            visualMap:[
                                {
                                    type:"piecewise",
                                    showLabel:true,
                                    itemSymbol:"roundRect",
                                    dimension:0,
                                    left:5,
                                    bottom:5,
                                    itemGap:2,
                                    itemWidth:12,
                                    itemHeight:12,
                                    seriesIndex: 0,
                                    selectModel:"single",
                                    zLevel:0,
                                    hoverLink:false,
                                    pieces:[
                                        {gte:10000,color:'#800000',label:">=10000"},
                                        {gte:500,lte:9999,color:"#FF0000",label:"500~9999"},
                                        {gte:100,lte:499,color:"#FF8C00",label:"100~499"},
                                        {gte:10,lte:99,color:"#FFD700",label:"10~99"},
                                        {gte:1,lte:9,color:"#FFE4B5",label:"1~9"},
                                        {lte:0,color:"#FFFAF0",label:"0"}
                                    ],
                                    textStyle:{
                                        fontSize:10,
                                        color:"black"
                                    },

                                }
                            ],
                            series:[{
                                name:'省',
                                type:'map',
                                map:'china',
                                roam:false,
                                zoom:1.2,
                                label:{
                                    normal:{
                                        show:true,
                                        textStyle:{
                                            //fontSize:15,
                                            //fonsSize:getFontSize(0.4),
                                            fontSize: '100%' ,
                                        }
                                    }
                                },
                                itemStyle:{
                                    normal:{
                                        areaColor:'rgba(0,255,236,0)',
                                        borderColor:'rgba(0,0,0,0.2)',
                                    },
                                    emphasis:{
                                        areaColor:'#1E90FF',
                                        shadowOffsetX:2,
                                        shadowOffsetY:2,
                                        shadowBlue:20,
                                        borderWidth:0,
                                        shadowColor:'rgba(0,0,0,0.5)'
                                    }
                                },
                                data:cityData
                            }]
                        }
                        this.chart.setOption(option);
                    },
                    provienceMap(id,name,cityData){
                        this.chart=echarts.init(document.getElementById(id));
                        //console.log(this.chart);
                        console.log("渲染map的data:")
                        console.log(cityData);
                        console.log(cityData[0]);
                        var option={
                            tooltip:{
                                triggerOn:"click",
                                enterable:true,
                                formatter(data) {
                                    console.log(JSON.stringify(data));
                                    return "<div style='font-size:2vw;'><p>"+data.name +":"+ "风险地区数量-" + data.value + "</p></div>"
                                }
                            },
                            visualMap:[
                                {
                                    type:"piecewise",
                                    showLabel:true,
                                    itemSymbol:"roundRect",
                                    dimension:0,
                                    right:10,
                                    top:25,
                                    itemGap:2,
                                    itemWidth:12,
                                    itemHeight:12,
                                    seriesIndex: 0,
                                    selectModel:"single",
                                    zLevel:0,
                                    hoverLink:false,
                                    pieces:[
                                        {gte:21,color:'#800000',label:">20"},
                                        {gte:11,lte:20,color:"#FF0000",label:"11~20"},
                                        {gte:6,lte:10,color:"#FF8C00",label:"6~10"},
                                        {gte:2,lte:5,color:"#FFD700",label:"2~5"},
                                        {gte:1,lte:1,color:"#FFE4B5",label:"1"},
                                        {lte:0,color:"#FFFAF0",label:"0"}
                                    ],
                                    textStyle:{
                                        fontSize:10,
                                        color:"black"
                                    },

                                }
                            ],
                            series:[
                                {   type:'map',
                                    map:name,
                                    roam:false,
                                    zoom:1.2,
                                    label:{
                                        normal:{
                                            show:true,
                                            textStyle:{
                                                fonsSize:'100%',
                                            }
                                        }
                                    },
                                    itemStyle:{
                                        normal:{
                                            areaColor:'rgba(0,255,236,0)',
                                            borderColor:'rgba(0,0,0,0.2)',
                                        },
                                        emphasis:{
                                            areaColor:'#1E90FF',
                                            shadowOffsetX:2,
                                            shadowOffsetY:2,
                                            shadowBlue:20,
                                            borderWidth:0,
                                            shadowColor:'rgba(0,0,0,0.5)'
                                        }
                                    },
                                    data:cityData,
                                }
                            ]
                        };
                        //this.chart.clear();
                        this.chart.setOption(option);
                    }
                }
            }
        }
    })
};
export default echartMap;