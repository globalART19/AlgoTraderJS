import React from 'react'
import FakeChart from './FakeChart'
import Charts from './Charts'

const HistoricalData = (props) => {
  const chartData = props.chartData
  if (props.chartName !== 'HistoricalData') { props.getChart('HistoricalData') }
  return (
    <div id='historicalData'>
      {(props.chartName !== 'HistoricalData') ? (<FakeChart />) : (<Charts chartData={chartData} chartName={props.chartName} />)}
      <form method="POST" action="/api/historicaldata/">
        <button type="submit" className="btn btn-primary" style={{ background: 'red' }}>Pull Data</button>
      </form>
    </div >)
}

export default HistoricalData

  // < h4 >
  // <a onClick={() => props.getChart('HistoricalData')}>View History Chart</a>
  //       </h4 >
