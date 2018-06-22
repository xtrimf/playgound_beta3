<template lang="html">
  <div >
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
var _ = require('lodash');
var myChart;

export default {
  data() {
    return{
      data: []
    }
  },
  computed: {
    renderChart(){

      var ctx = document.getElementById("myChart").getContext("2d");;

      var hot = ctx.createLinearGradient(0, 400, 0, 0);
      hot.addColorStop(0, "rgba(242, 64, 15, 0.8)");
      hot.addColorStop(1, "rgba(242, 64, 15, 0.55)");

      var very_warm = ctx.createLinearGradient(0, 400, 0, 0);
      very_warm.addColorStop(0, "rgba(250,97,2,0.8)");
      very_warm.addColorStop(1, "rgba(247,106,17,0.55)");

      var warm = ctx.createLinearGradient(0, 400, 0, 0);
      warm.addColorStop(0, "rgba(242,117,39,0.8)");
      warm.addColorStop(1, "rgba(251,190,121,0.55)");

      var slightly_warm = ctx.createLinearGradient(0, 400, 0, 0);
      slightly_warm.addColorStop(0, "rgba(243,191,1,0.8)");
      slightly_warm.addColorStop(1, "rgba(250,225,26,0.55)");

      var neutral = ctx.createLinearGradient(0, 400, 0, 0);
      neutral.addColorStop(0, "rgba(0,204,102,0.8)");
      neutral.addColorStop(1, "rgba(18,179,106,0.35)");

      var slightly_cool = ctx.createLinearGradient(0, 400, 0, 0);
      slightly_cool.addColorStop(0, "rgba(55,204,182,0.8)");
      slightly_cool.addColorStop(1, "rgba(139,241,231,0.55)");

      var cool = ctx.createLinearGradient(0, 400, 0, 0);
      cool.addColorStop(0, "rgba(44,176,209,0.7)");
      cool.addColorStop(1, "rgba(96,216,235,0.45)");

      var slightly_cold = ctx.createLinearGradient(0, 400, 0, 0);
      slightly_cold.addColorStop(0, "rgba(0,102,153,0.8)");
      slightly_cold.addColorStop(1, "rgba(79,219,238,0.55)");

      var cold = ctx.createLinearGradient(0, 400, 0, 0);
      cold.addColorStop(0, "rgba(0,51,102,0.8)");
      cold.addColorStop(1, "rgba(62,149,190,0.55)");

      var very_cold = ctx.createLinearGradient(0, 400, 0, 0);
      very_cold.addColorStop(0, "rgba(2,34,56,0.8)");
      very_cold.addColorStop(1, "rgba(14,108,152,0.55)");


      //console.log(this.$store.getters.getChartData);
      myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [["Very", "Cold"], "Cold", ["Slightly", "Cold"], "Cool", ["Slightly","Cool"], "Neutral", ["Slightly","Warm"], "Warm", ["Very","Warm"], "Hot"],
            backgroundColor: 'rgba(255, 255, 255,0.9)',
            showDatapoints: true,
            datasets: [{
                label: '',
                data: this.data,
                backgroundColor: [
                    very_cold,
                    cold,
                    slightly_cold,
                    cool,
                    slightly_cool,
                    neutral,
                    slightly_warm,
                    warm,
                    very_warm,
                    hot
                ],
                hoverBackgroundColor: [
                  very_cold,
                  cold,
                  slightly_cold,
                  cool,
                  slightly_cool,
                  neutral,
                  slightly_warm,
                  warm,
                  very_warm,
                  hot
                ],
                // hoverBorderColor: 'grey',
                hoverBorderWidth: 2,
                datalabels: {
                  align: 'end',
                  anchor: 'start'
                },
                hoverBorderColor: [
                    'rgba(22,59,89,0.8)',
                    'rgba(38 ,87 ,127, 0.8)',
                    'rgba(51, 172, 238, 0.8)',
                    'rgba(82, 191, 215, 0.8)',
                    'rgba(78, 221, 188, 0.8)',
                    'rgba(53, 196, 119, 0.8)',
                    'rgba(234, 186, 26, 0.8)',
                    'rgba(238, 128, 67, 0.8)',
                    'rgba(238, 98, 30, 0.8)',
                    'rgba(224, 77, 64, 0.8)'
                ]
                //borderWidth: 1
            }]
        },
        options: {
          // Boolean - whether or not the chart should be responsive and resize when the browser does.
            responsive: true,
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: false,
          plugins: {
  					datalabels: {
  						color: 'white',
  						display: function(context) {
  							return context.dataset.data[context.dataIndex] > 15;
  						},
  						font: {
  							weight: 'bold'
  						},
  						formatter: Math.round
  					}
  				},
          animation: {
            duration: 0,
            // easing: "easeInOutBack",
            onComplete: function () {
                // render the value of the chart above the bar
                //console.log(this.data.datasets);
                var ctx = this.chart.ctx;
                ctx.font = '16px "Roboto", sans-serif';//Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
                // console.log(ctx.font);
                ctx.fillStyle = this.chart.config.options.defaultFontColor;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'bottom';
                this.data.datasets.forEach(function (dataset) {
                    for (var i = 0; i < dataset.data.length; i++) {
                        var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
                        ctx.fillText(dataset.data[i]>0 ? dataset.data[i]+'%' :'', model.x, model.y - 5);
                    }
                });
            }},
          title: {
                display: true,
                fontFamily: 'roboto',
                fontColor: '#39393A',
                fontStyle: '400',
                fontSize: 24,
                text: ["Temperature Distribution",""] // we need one empty line - this way it splits to lines
            },
            tooltips:{
              enabled: false
            },
            hover: {
              //mode: 'nearest',
              //intersect: true,
              animationDuration: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
                       fontFamily: 'roboto',
                       fontSize: 14,
                        beginAtZero:true,
                        // Include a % sign in the ticks
                        callback: function(value, index, values) {
                            return value+'%'
                          },
                        stepSize: 10
                    },
                    scaleLabel: {
                      labelString: '%'
                    },
                    gridLines: {color : 'rgb(197,197,197)'}
                }],
                xAxes: [{
                  ticks: {
                    fontFamily: 'Roboto',
                    fontSize: 16,
                    fontColor: '#39393A',
                    fontStyle: 'normal'
                  },
                  gridLines: {display : false}
                }]
            }
        }
      });
    },
    chartDataWatcher(){
      return this.$store.getters.getChartData
    },
    getRevision(){
      return this.$store.getters.revision
    },

    dataset() {
      let vals=[];
      const total = _.sumBy(this.$store.getters.getChartData,'quan');
      //console.log(total +' '+ JSON.stringify(this.$store.getters.getChartData));
      for(let i=0;i<this.$store.getters.getChartData.length;i++){
         vals.push(Math.round((this.$store.getters.getChartData[i].quan / total)*100*100)/100);
      }
      //console.log(vals);
      this.data = vals;
      //myChart.update();
    }

  },
  watch:{
    chartDataWatcher() {
      this.dataset;
      myChart.destroy();
      this.renderChart;
    }
    // getRevision() {
    //   console.log('revision');
    //   this.dataset;
    //   console.log(this.data);
    //   myChart.destroy();
    //   //this.renderChart;
    // },

  },
  // created(){
  //   this.dataset;
  // },
  mounted() {
    this.renderChart;
  }
}
</script>

<style lang="css">
#myChart {
  margin: auto;
  display: block;
}
.chartjs-render-monitor {
  /* min-width: 500px !important; */
  /* min-height: 350px !important; */
  width: 100% !important;
  height: 100% !important;
  max-height: 400px !important;
  background-color: rgba(255,255,255,0.85);
}

</style>
