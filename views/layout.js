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
                    <li><a href="/user/">User Dashboard</a></li>
                    <li><a href="/market">Current Market State</a></li>
                    <li><a href="/algorithm/">Algorithm</a></li>
                    <li><a href="/historicaldata/">Historical Testing</a></li>
                  </ul>
                  <ul id="right-nav-items" class="nav navbar-nav">
                    <li><a href="/login">Log In</a></li>
                    <li><a href="/signup">Sign Up</a></li>
                    <li><a href="/support">Support</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="container content">
              $${content}
            </div>
            <hr />
            <div id="footer" class="container text-muted">
              <div>
                AlgoTraderJS by Andrew Trahan
              </div>
              <div>
                Styling ripped from Fullstack Academy Wikistacks Workshop
              </div>
              <div>
                Should put a site map down here at some point
              </div>
            </div>
          </body>
</html>`
