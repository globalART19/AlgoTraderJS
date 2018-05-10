const indicators = require('./indicatorcalcs')

const calculateIndicators = function (histData) {
  const setPeriod = 1; //in days
  // const granularity = HistoricalData.findById(2).histTime - HistoricalData.findById(1).histTime
  const granularity = Math.abs(histData[0][0] - histData[1][0])
  const dataPointsPerPeriod = Math.floor(setPeriod * 86400 / granularity)
  const sortedHistData = histData.sort((a, b) => a[0] - b[0])
  sortedHistData.forEach((item, i, histDataArray) => {
    let m12ema = null
    let m26ema = null
    let mave = null
    let msig = null
    let rsi = null
    if (i > 12 * dataPointsPerPeriod) {
      m12ema = indicators.m12ema(histDataArray, i, dataPointsPerPeriod)
    }
    if (i > 26 * dataPointsPerPeriod) {
      m26ema = indicators.m26ema(histDataArray, i, dataPointsPerPeriod)
      mave = m12ema - m26ema
    }
    if (i > 44 * dataPointsPerPeriod) {
      msig = indicators.msig(histDataArray, i, mave, dataPointsPerPeriod)
    }
    if (i > 15 * dataPointsPerPeriod) {
      rsi = indicators.rsi(histDataArray, i, dataPointsPerPeriod)
    }
    item.push(m12ema, m26ema, mave, msig, rsi)
  })
  console.log('Calculations complete')
}

module.exports = calculateIndicators