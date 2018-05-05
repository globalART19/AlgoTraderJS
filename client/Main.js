import React from 'react'
import HistoricalData from './HistoricalData'
import User from './User'
import HomePage from './HomePage'
import NavBar from './NavBar'
// import axios from 'axios'

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
    }
    this.changeView = this.changeView.bind(this)
  }
  changeView(view) {
    this.setState({ currentView: view })
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
              return <HistoricalData />
            default:
              return <HomePage />
          }
        })()}
      </div>
    )
  }
}
