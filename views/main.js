const html = require('html-template-tag')
const layout = require('./layout')

module.exports = (content) => layout(html`
  <div id = "welcome-message" class= "main">
    <h1>Main Page - Starting Up!!</h1>
    <img id="main-img" src="https://images.freeimages.com/images/large-previews/a16/laptop-notebook-lcd-busted-screen-broke-broken-broken-screen-scrapped-computer-telecommuter-disaster-work-bad-day-1243170.jpg" alt="Still Getting Set Up">
    <p>${content}</p>
  </div>
  `)
