import React from 'react'

const User = (props) => {
  return (<div>
    <h1>User Dashboard</h1>
    <div id='performanceblock'>
      <div id='perfchart'>
        <div id='pcnavbar'>
          <div className='productselector'>BTC</div>
          <div className='productselector'>LTC</div>
          <div className='productselector'>ETH</div>
          <div className='chartoptions'>Opt 1</div>
          <div className='chartoptions'>Opt 2</div>
          <div className='chartoptions'>Opt 3</div>
          <div className='chartoptions'>Opt 4</div>
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
        <div className='productselector'>BTC</div>
        <div className='productselector'>LTC</div>
        <div className='productselector'>ETH</div>
        <div className='chartoptions'>Opt 1</div>
        <div className='chartoptions'>Opt 2</div>
        <div className='chartoptions'>Opt 3</div>
        <div className='chartoptions'>Opt 4</div>
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
      <div className='productselector'>BTC</div>
      <div className='productselector'>LTC</div>
      <div className='productselector'>ETH</div>
      <h3>Market News</h3>
      <div className='newsblurb'>Pretty lil news blurbs</div>
      <div className='newsblurb'>Pretty lil news blurbs</div>
      <div className='newsblurb'>Pretty lil news blurbs</div>
      <div className='newsblurb'>Pretty lil news blurbs</div>
    </div>
  </div>)
}

export default User

// User dashboard
// User balance, trades, graph of gain/loss over time, most recent trade history on graph,
// algo performance, etc
