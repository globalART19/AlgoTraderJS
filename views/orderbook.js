const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`<h1>${content}</h1>`)
