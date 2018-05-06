import React from 'react'
import FakeChart from './FakeChart'
import Charts from './Charts'

const HistoricalData = (props) => {
  const chartData = props.chartData
  console.log('HD', chartData)
  return (
    <div id='historicalData' className='ct-chart ct-perfect-fourth'>
      <section>
        <h4>
          <a onClick={() => props.getHistoryChart()}>View History Chart</a>
        </h4>
        {(!chartData[0]) ? (<FakeChart />) : (<Charts chartData={chartData} />)}
        <form method="POST" action="/historicaldata/">
          <button type="submit" className="btn btn-primary" style={{ background: 'red' }}>Pull Data</button>
        </form>
      </section>
    </div >)
}

export default HistoricalData
