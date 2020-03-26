
  

var vapp = new Vue({
    el: '#vue-app',
    data: {
        message: 'Loading',
        rawJson: '',
        selected: 'PAK',
        countries: [
            'PAK',
            'IND',
            'AFG'
        ],
        latest: ''
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
                // console.log(this.rawJson.result[0].values())
                
            })
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
    data() {
        return {
          componentKey: 0,
        };
      },
    mounted () {
      this.renderChart({
        labels: Object.keys(vapp.rawJson.result),
        datasets: [
          {
            label: 'Confirmed Cases',
            backgroundColor: '#f87979',
            data: wow()
          }
        ]
      }, {responsive: true, maintainAspectRatio: false})
    },
    methods: {
        forceRerender() {
          this.componentKey += 1;  
        }
      }
  })

