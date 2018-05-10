const indicators = require('./indicatorcalcs')

const calculateIndicators = function (histData) {
  const setPeriod = 1; //in days
  // const granularity = HistoricalData.findById(2).histTime - HistoricalData.findById(1).histTime
  const granularity = Math.abs(histData[0][0] - histData[1][0])
  const dataPointsPerPeriod = Math.floor(setPeriod * 86400 / granularity)
  console.log('granularity', granularity)
  console.log('datapoints per period', dataPointsPerPeriod)
  histData.forEach((item, i) => {
    let m12ema = null
    let m26ema = null
    let mave = null
    let msig = null
    let rsi = null
    if (i >= 12 * dataPointsPerPeriod) {
      console.log('hits m12')
      m12ema = indicators.m12ema(histData, i, dataPointsPerPeriod)
    }
    if (i >= 15 * dataPointsPerPeriod) {
      rsi = indicators.rsi(histData, i, dataPointsPerPeriod)
    }
    if (i >= 26 * dataPointsPerPeriod) {
      m26ema = indicators.m26ema(histData, i, dataPointsPerPeriod)
      mave = m12ema - m26ema
    }
    if (i >= 41 * dataPointsPerPeriod) {
      msig = indicators.msig(histData, i, dataPointsPerPeriod)
    }
    item.push(m12ema, m26ema, mave, msig, rsi)
  })
  console.log('Calculations complete')
}

module.exports = calculateIndicators