<template lang="html">
  <div >
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js';
var _ = require('lodash');

export default {
  data() {
    return{
      //data: [12, 19, 3, 5, 2, 3,12, 19, 3, 5]
    }
  },
  computed: {
    renderChart(){
      var ctx = document.getElementById("myChart");
      //console.log(this.$store.getters.getChartData);
      var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [["Very", "Cold"], "Cold", ["Slightly", "Cold"], "Cool", ["Slightly","Cool"], "Neutral", ["Slightly","Warm"], "Warm", ["Very","Warm"], "Hot"],
            backgroundColor: 'rgba(255, 255, 255,1)',
            showDatapoints: true,
            datasets: [{
                label: '',
                data: this.dataset,
                backgroundColor: [
                    'rgba(14, 10, 200, 0.85)',
                    'rgba(0, 0, 254, 0.85)',
                    'rgba(14, 100, 254, 0.85)',
                    'rgba(66, 170, 255, 0.85)',
                    'rgba(71, 191, 168, 0.85)',
                    'rgba(118, 191, 104, 0.85)',
                    'rgba(249, 224, 14, 0.85)',
                    'rgba(233, 90, 13, 0.85)',
                    'rgba(231, 61, 11, 0.85)',
                    'rgba(230, 10, 10, 0.85)'
                ],
                datalabels: {
                  align: 'end',
                  anchor: 'start'
                }
                // borderColor: [
                //     'rgba(14, 10, 200,1)',
                //     'rgba(0, 0, 254, 1)',
                //     'rgba(14, 100, 254, 1)',
                //     'rgba(66, 170, 255, 1)',
                //     'rgba(71, 191, 168, 1)',
                //     'rgba(118, 191, 104, 1)',
                //     'rgba(249, 224, 14, 1)',
                //     'rgba(233, 90, 13, 1)',
                //     'rgba(231, 61, 11, 1)',
                //     'rgba(230, 10, 10, 1)'
                // ],
                //borderWidth: 1
            }]
        },
        options: {
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
            onComplete: function () {
                // render the value of the chart above the bar
                var ctx = this.chart.ctx;
                ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
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
                fontSize: 16,
                text: ["Temperature Distribution",""] // we need one empty line - this way it splits to lines
            },
            tooltips:{
              enabled: false
            },
            hover: {
                animationDuration: 0
            },
            legend: {
                display: false,
            },
            scales: {
                yAxes: [{
                    ticks: {
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
                }],
                xAxes: [{
                  gridLines: {display : false}
                }]
            }
        }
      });
      // myChart.pluginService.register({
      //   afterDraw: function(chartInstance) {
      //       var ctx = chartInstance.chart.ctx;
      //
      //       // render the value of the chart above the bar
      //       ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
      //       ctx.textAlign = 'center';
      //       ctx.textBaseline = 'bottom';
      //
      //       chartInstance.data.datasets.forEach(function (dataset) {
      //           for (var i = 0; i < dataset.data.length; i++) {
      //               var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
      //               ctx.fillText(dataset.data[i]>0 ? dataset.data[i]+'%' :'', model.x, model.y - 2);
      //           }
      //       });
      //   }
      // });
    },
    chartDataWatcher(){
      return this.$store.getters.getChartData
    },
    dataset() {
      var vals=[];
      var total = _.sumBy(this.$store.getters.getChartData,'quan');
      //console.log(total +' '+ JSON.stringify(this.$store.getters.getChartData));
      for(var i=0;i<this.$store.getters.getChartData.length;i++){
         vals.push(Math.round((this.$store.getters.getChartData[i].quan / total)*100*100)/100);
      }
      //console.log(vals);
      return vals;
    }
  },
  watch:{
    chartDataWatcher() {
      this.dataset;
      this.renderChart;
    }
  },
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
  min-width: 500px !important;
  min-height: 350px !important;
  max-width: 600px !important;
  max-height: 400px !important;
  background-color: white;
}

</style>
