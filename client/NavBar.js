import React from 'react'

const NavBar = (props) => {
  return (
    <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#nav-items">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a className="navbar-brand" href="/">AlgoTraderJS</a>
        </div>
        <div id="nav-items" className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            {props.views.map(view => {
              return (<li key={view.name}>
                <a onClick={() => props.changeView(view.name)} > {view.navLabel}</a>
              </li>)
            }
            )}
          </ul>
          <ul id="right-nav-items" className="nav navbar-nav">
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/signup">Sign Up</a>
            </li>
            <li>
              <a href="/support">Support</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default NavBar
