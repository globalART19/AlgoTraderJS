import React from 'react'

const HistoricalData = (props) => {
  return (
    <div id='historicalData' className='ct-chart ct-perfect-fourth'>
      <img src='https://www.tradingview.com/x/vPJvUmNi' id='logo' />
      <p>image from: https://www.tradingview.com/x/vPJvUmNi</p>
      <section>
        <h4>
          <a onClick={() => props.goHome()}>View JSON Data</a>
        </h4>
        <form method="POST" action="/historicaldata/">
          <button type="submit" className="btn btn-primary" style={{ background: 'red' }}>Pull Data</button>
        </form>
      </section>
    </div >)
}

export default HistoricalData



// module.exports = (chartData, cd2) => layout(html`
// <div class="ct-chart ct-perfect-fourth"></div>
// <form method="POST" action="/historicaldata/">
//   <button type="submit" class="btn btn-primary" style="background: red">Pull Data</button>
// </form>
// <script>
// var data = {
//   // A labels array that can contain any sort of values
//   labels: [1,2,3,4,5],
//   // Our series array that contains series objects or in this case series data arrays
//   series: [
//     [5, 2, 4, 2, 0]
//   ]
// };
// // console.log(data.labels)
// // console.log(data.series)
// // console.log(${chartData})

// // Create a new line chart object where as first parameter we pass in a selector
// // that is resolving to our chart container element. The Second parameter
// // is the actual data object.
// new Chartist.Line('.ct-chart', data);
// // new Chartist.Line('.ct-chart', ${chartData});
// </script>
// `)

// 2 buttons, one for updating history, one for discard / full pull (with warning alert)
// Display historical data graph here
