import React from 'react'
import Charts from './Charts'
import axios from 'axios'
import FormUpdateIndicators from './FormUpdateIndicators'
import AlgorithmResults from './AlgorithmResults'


class HistoricalData extends React.Component {
  constructor() {
    super()
    this.state = {
      period: 3600,
      granularity: 3600
    }
    this.handlePullData = this.handlePullData.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  async handlePullData() {
    await axios.post('/api/historicaldata/', { 'period': this.state.period, 'granularity': this.state.granularity })
    this.setState(this.state)
    console.log('historical data pull complete')
  }
  async handleSubmit(event) {
    event.preventDefault()
    await this.setState({
      period: event.target.period.value * 3600
    })
    await this.props.getChart('HistoricalData', { 'period': this.state.period, 'granularity': this.state.granularity })
  }
  async componentDidMount() {
    if (this.props.chartName !== 'HistoricalData') { await this.props.getChart('HistoricalData') }
  }
  render() {
    const chart1Data = this.props.chartData.map(instance => {
      return instance.slice(0, 5)
    })
    const chart2Data = this.props.chartData.map(instance => {
      return [...instance.slice(0, 1), ...instance.slice(4, 6)]
    })
    const chart3Data = this.props.chartData.map(instance => {
      return [...instance.slice(0, 1), ...instance.slice(6)]
    })
    return (
      <div id='historicalData'>
        <FormUpdateIndicators handlePullData={this.handlePullData} handleSubmit={this.handleSubmit} />
        <AlgorithmResults />
        <Charts chartData={chart1Data} chartName={this.props.chartName} />
        {!!chart2Data.length && !!(chart2Data[0].length - 1) && <Charts chartData={chart2Data} chartName='mAve and mSig' />}
        {!!chart3Data[0] && !!(chart2Data[0].length - 1) && <Charts chartData={chart3Data} chartName='rSig' />}
        <button type='button' onClick={() => { this.handlePullData() }} className="btn btn-primary" style={{ display: 'block', margin: 'auto', background: 'red' }}>Pull Data</button>
      </div >
    )
  }
}

export default HistoricalData
