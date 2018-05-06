import React from 'react'
import HistoricalData from './HistoricalData'
import User from './User'
import HomePage from './HomePage'
import NavBar from './NavBar'
import axios from 'axios'
import moment from 'moment'

export default class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      views: [
        {
          name: 'User',
          navName: 'User Dashboard'
        }, {
          name: 'Market',
          navName: 'Current Market State'
        }, {
          name: 'Algorithm',
          navName: 'Algorithm'
        }, {
          name: 'HistoricalData',
          navName: 'Historical Testing'
        }
      ],
      currentView: 'HomePage',
      chartData: {}
    }
    this.changeView = this.changeView.bind(this)
    this.getHistoryChart = this.getHistoryChart.bind(this)
  }
  changeView(view) {
    this.setState({ currentView: view })
  }
  async getHistoryChart() {
    const res = await axios.get('/api/historicaldata/chart')
    let chartData = JSON.parse(res.data)
    await this.setState({ chartData: chartData })
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
            case 'HistoricalData':
              return <HistoricalData chartData={this.state.chartData} getHistoryChart={this.getHistoryChart} />
            default:
              return <HomePage />
          }
        })()}
      </div>
    )
  }
}
