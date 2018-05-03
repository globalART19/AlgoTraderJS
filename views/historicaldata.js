const html = require('html-template-tag')
const layout = require('./layout')



module.exports = (chartData) => layout(html`
<div class="ct-chart ct-perfect-fourth"></div>
<form method="POST" action="/historicaldata/">
  <button type="submit" class="btn btn-primary" style="background: red">Pull Data</button>
</form>
<script>new Chartist.Line('.ct-chart', ${chartData})</script>
`)

// 2 buttons, one for updating history, one for discard / full pull (with warning alert)
// Display historical data graph here
