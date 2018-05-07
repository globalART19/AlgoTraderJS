import React from 'react'
import FakeChart from './FakeChart'
import Charts from './Charts'

const HistoricalData = (props) => {
  const chartData = props.chartData
  return (
    <div id='historicalData' className='ct-chart ct-perfect-fourth'>
      <section>
        <h4>
          <a onClick={() => props.getChart('HistoricalData')}>View History Chart</a>
        </h4>
        {(props.chartName !== 'HistoricalData') ? (<FakeChart />) : (<Charts chartData={chartData} chartName={props.chartName} />)}
        <form method="POST" action="/api/historicaldata/">
          <button type="submit" className="btn btn-primary" style={{ background: 'red' }}>Pull Data</button>
        </form>
      </section>
    </div >)
}

export default HistoricalData
