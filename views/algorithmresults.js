const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)

// Display interactive chart of algorithm results across the data set
// Button to go back to algorithmform to update inputs
// Include ways to search specific date ranges, turn indicators on/off, etc
// Would be cool to build something really sleek here
