const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`
<h1>${content}</h1>
<form method="POST" action="/historicaldata/">
<button type="submit" class="btn btn-primary" style="background: red">Pull Data</button>
</form>
`)

// 2 buttons, one for updating history, one for discard / full pull (with warning alert)
// Display historical data graph here
