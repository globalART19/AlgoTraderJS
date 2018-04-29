const html = require('html-template-tag')

module.exports = (content) => html`
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>AlgoTraderJS</title>
        <link href="http://netdna.bootstrapcdn.com/bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
          <link href="/stylesheets/style.css" rel="stylesheet">
      </head>
          <body>
            <div class="navbar navbar-fixed-top navbar-inverse" role="navigation">
              <div class="container">
                <div class="navbar-header">
                  <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                  <a class="navbar-brand" href="/">AlgoTraderJS</a>
                </div>
                <div id="nav-items" class="collapse navbar-collapse">
                  <ul class="nav navbar-nav">
                    <li><a href="/user/">User Home</a></li>
                    <li><a href="/historicaltesting/">Historical Testing</a></li>
                    <li><a href="/algorithm/">Algorithm</a></li>
                    <li><a href="/charts">Charts</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="container content">
              $${content}
            </div>
            <hr />
            <div id="footer" class="container text-muted">
              AlgoTraderJS by Andrew Trahan
              Styling ripped from Fullstack Academy Wikistacks Workshop
          </div>
          </body>
</html>`
