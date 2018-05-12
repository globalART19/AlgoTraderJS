import React from 'react'
import Charts from './Charts'
import axios from 'axios'
import FormUpdateIndicators from './FormUpdateIndicators'


class HistoricalData extends React.Component {
  constructor() {
    super()
    this.state = {
      period: 3600
    }
    this.handlePullData = this.handlePullData.bind(this)
  }
  async handlePullData(period = 3600) {
    await axios.post('/api/historicaldata/', { 'period': period })
    console.log('historical data pull complete')
  }
  async handleSubmit(period) {
    this.setState({ period })
    await axios.post('/api/historicaldata/updateindicators', { 'period': this.state.period })
    console.log('indicator period update complete')
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
