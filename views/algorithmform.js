const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)

// Form to allow modification of all algorithm constants
// Maybe slider bars with text literal inputs?
// Would be cool to build something really sleek here
// Submit button to show chart of calculated data
