const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)

// 2 buttons, one for updating history, one for discard / full pull (with warning alert)
// Display historical data graph here
