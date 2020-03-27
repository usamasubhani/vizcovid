
var vapp = new Vue({
    el: '#vue-app',
    data: {
        message: 'Loading',
        rawJson: '',
        selected: 'PAK',
        countries: [
            'PAK',
            'IND',
            'AFG',
            'ITA',
            'USA'
        ],
        latest: '',
        dataChart: [10, 39, 10, 40, 39, 0, 0]
    },
    created: function() {
        this.getCountryData();
    },
    methods: {
        getGlobalData : function() {
            fetch('https://covidapi.info/api/v1/global')
            .then(response => response.json())
            .then(data => {
                this.message = data
            })
        },
        getCountryData: function(country) {
            fetch(`https://covidapi.info/api/v1/country/${this.selected}`)
            .then(response => response.json())
            .then(data => {
                this.message = data
                this.rawJson = data
                this.latest = this.rawJson.result[Object.keys(this.rawJson.result)[Object.keys(this.rawJson.result).length-1]]
                this.dataChart = wow()
                // console.log(this.rawJson.result[0].values())
                
            })
        },
        changeData: function() {
          this.dataChart = [6, 6, 3, 5, 5, 6];
        }
    }
});

let wow = function(rawJson){
    var tempArray = []
    for (let [key, value] of Object.entries(vapp.rawJson.result)) {
        tempArray.push(value.confirmed)
    }
    console.log(tempArray)
    return tempArray
}


Vue.component('dc', {
    extends: VueChartJs.Line,
    props: ["data"],
    // data() {
    //     return {
    //       datacollection: null
    //     };
    //   },
    mounted () {
      
      this.getData()
      console.log(this.chartData)
      // this.renderChart()
      
    },
    computed: {
      chartData: function() {
        console.log(this.data)
        return this.data;
      }
    },
    methods: {
        getData() {
          this.renderChart({
            labels: Object.keys(vapp.rawJson.result),
            datasets: [
              {
                label: 'Confirmed Cases',
                backgroundColor: '#f87979',
                data: this.chartData
              }
            ]
        }),{responsive: true, maintainAspectRatio: false };
      }
    },
    watch:{
      data: function() {
        this._chart.destroy();
        //this.renderChart(this.data, this.options);
        this.getData();
      }
    }
})



Vue.component("line-chart", {
  extends: VueChartJs.Line,
  props: ["data", "options"],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData: function() {
      console.log(this.data)
      return this.data;
    }
  },
  methods: {
    renderLineChart: function() {
    this.renderChart(
      {
        labels: Object.keys(vapp.rawJson.result),
        datasets: [
          {
            label: "Confirmed",
            // backgroundColor: "#f87979",
            borderColor: '#FC2525', 
            pointBackgroundColor: 'red', 
            borderWidth: 1, 
            pointBorderColor: 'black',
            data: this.chartData
          }
        ]
      },
      { responsive: true, maintainAspectRatio: false }
    );      
    }
  },
  watch: {
    data: function() {
      // this._chart.destroy();
      //this.renderChart(this.data, this.options);
      this.renderLineChart();
    }
  }
});

