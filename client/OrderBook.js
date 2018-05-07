import React from 'react'
import Charts from './Charts'
import FakeChart from './FakeChart'


const OrderBook = (props) => {
  if (props.chartName !== 'OrderBook') { props.getChart('OrderBook') }
  return (
    <div>
      <button type='submit' onClick={() => { props.importOrderBook() }} >Import Order Book</button>
      {(props.chartName !== 'OrderBook') ? <FakeChart /> : <Charts chartData={props.chartData} chartName={props.chartName} />}
    </div>
  )
}

export default OrderBook
