import React from 'react'

const User = (props) => {
  return (<div>
    <h1>User Dashboard</h1>
    <div className='flex-container'>
      <div id='leftColumn1'>
        <div id='performanceblock'>
          <div id='perfchart'>
            <div id='pcnavbar'>
              <div>
                <div className='productselector'>BTC</div>
                <div className='productselector'>LTC</div>
                <div className='productselector'>ETH</div>
              </div>
              <div>
                <div className='chartoptions'>Opt 1</div>
                <div className='chartoptions'>Opt 2</div>
                <div className='chartoptions'>Opt 3</div>
                <div className='chartoptions'>Opt 4</div>
              </div>
            </div>
            Such a pretty graph chart thing!!!</div>
        </div>
        <div id='level2block'>
          <div id='l2chart'>
            <div id='pcnavbar'>
              <div>
                <div className='productselector'>BTC</div>
                <div className='productselector'>LTC</div>
                <div className='productselector'>ETH</div>
              </div>
              <div>
                <div className='chartoptions'>Opt 1</div>
                <div className='chartoptions'>Opt 2</div>
                <div className='chartoptions'>Opt 3</div>
                <div className='chartoptions'>Opt 4</div>
              </div>
            </div>
            Another pretty graph chart thing!!!
          </div>
        </div>
      </div>
      <div className='rightColumn1'>
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
        <div id='ad'>$$$$$$$$$</div>
      </div>
    </div>
    <div id='news'>
      <div id='news-header'>
        <div id='news-picker'>
          <div className='productselector'>BTC</div>
          <div className='productselector'>LTC</div>
          <div className='productselector'>ETH</div>
        </div>
        <h3>Market News</h3>
      </div>
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
