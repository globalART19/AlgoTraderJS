import React from 'react'
import Charts from './Charts'


class OrderBook extends React.Component {
  constructor() {
    super()
    this.state = {
      intervalId: ''
    }
  }
  componentDidMount() {
    this.props.getChart('OrderBook')
    const chartRefresh = setInterval(() => {
      this.props.getChart('OrderBook')
    }, 1000)
    this.setState({ intervalId: chartRefresh })
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }
  render() {
    return (
      <div>
        {<Charts chartData={this.props.chartData} chartName={this.props.chartName} />}
      </div >
    )
  }
}

export default OrderBook