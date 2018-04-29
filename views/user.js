const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)

// User dashboard
// User balance, trades, graph of gain/loss over time, most recent trade history on graph,
// algo performance, etc
