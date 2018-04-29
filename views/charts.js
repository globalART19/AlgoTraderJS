const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)

// Display all current state charts and graphs here. Maybe make this a live update dashboard?
// Links to all available static charts and graphs with indicators and interactivity
