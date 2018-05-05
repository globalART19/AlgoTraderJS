import React from 'react'

const User = (props) => {
  return (<div>
    <h1>User Dashboard</h1>
    <div id='performanceblock'>
      <div id='perfchart'>
        <div id='pcnavbar'>
          <div class='productselector'>BTC</div>
          <div class='productselector'>LTC</div>
          <div class='productselector'>ETH</div>
          <div class='chartoptions'>Opt 1</div>
          <div class='chartoptions'>Opt 2</div>
          <div class='chartoptions'>Opt 3</div>
          <div class='chartoptions'>Opt 4</div>
        </div>
        Such a pretty graph chart thing!!!</div>
    </div>
    <div id='performancedata'>
      <div id='totalsbox'>
        <h4>Portfolio Performance</h4>
        <div id='totalsdata'>Aggregate Performance Data</div>
      </div>
      <div id='tradehistorybox'>
        <h4>Recent Trade History</h4>
        <div id='tradehistory'>Couple trades and such</div>
      </div>
    </div>
    <div id='level2chart'>
      <div id='l2navbar'>
        <div class='productselector'>BTC</div>
        <div class='productselector'>LTC</div>
        <div class='productselector'>ETH</div>
        <div class='chartoptions'>Opt 1</div>
        <div class='chartoptions'>Opt 2</div>
        <div class='chartoptions'>Opt 3</div>
        <div class='chartoptions'>Opt 4</div>
      </div>
      <div id='l2chart'>Another pretty graph chart thing!!!</div>
    </div>
    <div id='algosettings'>
      Current Algorithm Settings
  </div>
    <div id='ad'>
      $$$$$$$$$
  </div>
    <div id='news'>
      <div class='productselector'>BTC</div>
      <div class='productselector'>LTC</div>
      <div class='productselector'>ETH</div>
      <h3>Market News</h3>
      <div class='newsblurb'>Pretty lil news blurbs</div>
      <div class='newsblurb'>Pretty lil news blurbs</div>
      <div class='newsblurb'>Pretty lil news blurbs</div>
      <div class='newsblurb'>Pretty lil news blurbs</div>
    </div>
  </div>)
}

export default User

// User dashboard
// User balance, trades, graph of gain/loss over time, most recent trade history on graph,
// algo performance, etc
