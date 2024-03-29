import React from 'react'
import { Chart } from 'react-google-charts'

const Charts = (props) => {
  const options = ((chartName) => {
    switch (chartName) {
      case 'HistoricalData':
        return {
          title: chartName,
          hAxis: {
            title: 'Time (1hr intervals for past year)',
            // format: 'MMM d, y'
          },
          vAxis: { title: 'Price ($)' },
          // legend: 'none',
          // pointSize: 1,
          explorer: {
            actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
            keepInBounds: true,
            zoomDelta: .25
          }
        }
      // case 'User':
      //   return {
      //     title: chartName,
      //     hAxis: {
      //       title: 'Time (1hr intervals for past year)',
      //     },
      //     vAxis: { title: 'Price ($)' },
      //     pointSize: 1,
      //     explorer: {
      //       actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
      //       keepInBounds: true,
      //       zoomDelta: .25
      //     }
      //   }
      case 'OrderBook':
        return {
          title: chartName,
          hAxis: {
            title: 'Price ($)',
          },
          vAxis: { title: 'Volume (open orders)' },
          // pointSize: 1,
          explorer: {
            actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
            keepInBounds: true,
            zoomDelta: .25
          }
        }
      // case 'Algorithm':
      //   return {
      //     title: chartName,
      //     hAxis: {
      //       title: 'Time (1hr intervals for past year)',
      //     },
      //     vAxis: { title: 'Price ($)' },
      //     pointSize: 1,
      //     explorer: {
      //       actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
      //       keepInBounds: true,
      //       zoomDelta: .25
      //     }
      //   }
      default:
        return {
          title: chartName,
          hAxis: {
            title: 'Default',
          },
          vAxis: { title: 'Default' },
          // pointSize: 1,
          explorer: {
            actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
            keepInBounds: true,
            zoomDelta: .25
          }
        }
    }
  })(props.chartName)

  return (
    <div className="google-chart">
      <Chart
        chartType="LineChart"
        data={props.chartData}
        options={options}
        graph_id={props.chartName}
        width="100%"
        height="600px"
      />
    </div>
  )
}

export default Charts
