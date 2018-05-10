import React from 'react'
import FakeChart from './FakeChart'
import Charts from './Charts'

const HistoricalData = (props) => {
  if (props.chartName !== 'HistoricalData') { props.getChart('HistoricalData') }
  return (
    <div id='historicalData'>
      {(props.chartName !== 'HistoricalData') ? (<FakeChart />) : (<Charts chartData={props.chartData} chartName={props.chartName} />)}
      <form method="POST" action="/api/historicaldata/">
        <button type="submit" className="btn btn-primary" style={{ background: 'red' }}>Pull Data</button>
      </form>
    </div >)
}

export default HistoricalData
