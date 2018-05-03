const html = require('html-template-tag')
const layout = require('./layout')



module.exports = (chartData, cd2) => layout(html`
<div class="ct-chart ct-perfect-fourth"></div>
<form method="POST" action="/historicaldata/">
  <button type="submit" class="btn btn-primary" style="background: red">Pull Data</button>
</form>
<script>
var data = {
  // A labels array that can contain any sort of values
  labels: [1,2,3,4,5],
  // Our series array that contains series objects or in this case series data arrays
  series: [
    [5, 2, 4, 2, 0]
  ]
};
// console.log(data.labels)
// console.log(data.series)
// console.log(${chartData})

// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object.
new Chartist.Line('.ct-chart', data);
// new Chartist.Line('.ct-chart', ${chartData});
</script>
`)

// 2 buttons, one for updating history, one for discard / full pull (with warning alert)
// Display historical data graph here
