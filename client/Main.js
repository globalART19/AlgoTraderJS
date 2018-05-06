import React from 'react'
import HistoricalData from './HistoricalData'
import User from './User'
import HomePage from './HomePage'
import NavBar from './NavBar'
import axios from 'axios'
import moment from 'moment'
import OrderBook from './OrderBook';

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      views: [
        {
          name: 'User',
          navLabel: 'User Dashboard'
        }, {
          name: 'OrderBook',
          navLabel: 'Current Market State'
        }, {
          name: 'Algorithm',
          navLabel: 'Algorithm'
        }, {
          name: 'HistoricalData',
          navLabel: 'Historical Testing'
        }
      ],
      currentView: 'HomePage',
      chartName: '',
      chartData: {}
    }
    this.changeView = this.changeView.bind(this)
    this.getChart = this.getChart.bind(this)
  }
  changeView(view) {
    this.setState({ currentView: view })
  }
  async getChart(chartName) {
    const res = await axios.get(`/api/${chartName}/chart`)
    const chartData = JSON.parse(res.data)
    this.setState({ chartData, chartName })
  }
  render() {
    return (
      <div id='main' className='row container'>
        <NavBar views={this.state.views} changeView={this.changeView} />
        {(() => {
          switch (this.state.currentView) {
            case 'HomePage':
              return <HomePage />
            case 'User':
              return <User />
            case 'OrderBook':
              return <OrderBook chartData={this.state.chartData} chartName={this.state.chartName} getChart={this.getChart} />
            case 'HistoricalData':
              return <HistoricalData chartData={this.state.chartData} chartName={this.state.chartName} getChart={this.getChart} />
            default:
              return <HomePage />
          }
        })()}
      </div>
    )
  }
}
