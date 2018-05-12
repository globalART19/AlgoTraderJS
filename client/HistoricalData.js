import React from 'react'
import Charts from './Charts'
import axios from 'axios'
import FormUpdateIndicators from './FormUpdateIndicators'


class HistoricalData extends React.Component {
  constructor() {
    super()
    this.handlePullData = this.handlePullData.bind(this)
  }
  async handlePullData(period = 3600) {
    await axios.post('/api/historicaldata/', { 'period': period })
  }
  render() {
    if (this.props.chartName !== 'HistoricalData') { this.props.getChart('HistoricalData') }
    return (
      <div id='historicalData'>
        <Charts chartData={this.props.chartData} chartName={this.props.chartName} />
        <FormUpdateIndicators handlePullData={this.handlePullData} />
      </div >
    )
  }
}

export default HistoricalData
