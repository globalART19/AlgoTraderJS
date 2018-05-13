import React from 'react'
import Charts from './Charts'
import axios from 'axios'
import FormUpdateIndicators from './FormUpdateIndicators'


class HistoricalData extends React.Component {
  constructor() {
    super()
    this.state = {
      period: 3600,
      granularity: 3600
    }
    this.handlePullData = this.handlePullData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  async handlePullData(event) {
    event.preventDefault()
    await axios.post('/api/historicaldata/', { 'period': this.state.period, 'granularity': this.state.granularity })
    this.setState(this.state)
    console.log('historical data pull complete')
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value * 3600
    })
  }
  async handleSubmit(event) {
    event.preventDefault()
    console.log('handleSubmit', this.state.period)
    await axios.post('/api/historicaldata/updateindicators', { 'period': this.state.period, 'granularity': this.state.granularity })
    await this.setState(this.state)
    console.log('indicator period update complete')
  }
  render() {
    if (this.props.chartName !== 'HistoricalData') { this.props.getChart('HistoricalData') }
    return (
      <div id='historicalData'>
        <Charts chartData={this.props.chartData} chartName={this.props.chartName} />
        <FormUpdateIndicators handlePullData={this.handlePullData} handleSubmit={this.handleSubmit} />
      </div >
    )
  }
}

export default HistoricalData
