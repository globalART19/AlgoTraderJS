import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
      chartName: '',
      chartData: {}
    }
    this.getChart = this.getChart.bind(this)
  }
  async getChart(chartName) {
    const res = await axios.get(`/api/${chartName}/chart`)
    const chartData = JSON.parse(res.data)
    this.setState({ chartData, chartName })
  }
  render() {
    return (
      <Router>
        <div id='main' className='row container'>
          <NavBar views={this.state.views} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/User" component={User} />
            <Route path='/OrderBook' render={() => <OrderBook chartData={this.state.chartData} chartName={this.state.chartName} getChart={this.getChart} />} />
            <Route path='/HistoricalData' render={() => <HistoricalData chartData={this.state.chartData} chartName={this.state.chartName} getChart={this.getChart} />} />
            <Route component={HomePage} />
          </Switch>
        </div>
      </Router>
    )
  }
}
