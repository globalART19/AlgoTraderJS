import React from 'react'
import { Chart } from 'react-google-charts'

const Charts = (props) => {
  console.log('charts', props.chartData)
  return (
    <div className="google-chart">
      <Chart
        chartType="ScatterChart"
        data={props.chartData}
        options={
          {
            title: 'BTC-USD Historical Data',
            hAxis: {
              title: 'Time (1hr intervals for past year)',
              // format: 'MMM d, y'
            },
            vAxis: { title: 'Price ($)' },
            // legend: 'none'
            pointSize: 1,
            explorer: {
              actions: ['dragToZoom', 'rightClickToReset', 'dragToPan'],
              keepInBounds: true,
              zoomDelta: .25
            }
          }
        }
        graph_id="HistoricalDataChart"
        width="100%"
        height="600px"
      />
    </div>
  )
}

export default Charts

// Display all current state charts and graphs here. Maybe make this a live update dashboard?
// Links to all available static charts and graphs with indicators and interactivity
