//Indicator calculations

const m12ema = function (histData, index, period) {
  let firstSum = 0
  for (let i = index; i < index + period; i++) {
    firstSum += histData[i][4]
  }
  let curSum = 0
  for (let i = index + period; i < index + 12 * period; i++) {
    curSum += histData[i][4]
  }
  const m12emaCalc = firstSum * 2 / (13 * period) + curSum / (13 * period)
  return m12emaCalc
}

const m26ema = function (histData, index, period) {
  let firstSum = 0
  for (let i = index; i < index + period; i++) {
    firstSum += histData[i][4]
  }
  let curSum = 0
  for (let i = index + period; i < index + 26 * period; i++) {
    curSum += histData[i][4]
  }
  const m26emaCalc = firstSum * 2 / (27 * period) + curSum / (27 * period)
  return m26emaCalc
}

const msig = function (histData, index, period) {
  let msigcalc = 0
  let firstSum = 0
  let curSum = 0
  for (let i = index; i < index + period; i++) {
    firstSum += histData[i][9]
  }
  for (let i = index + period; i < index + period * 8; i++) {
    curSum += histData[i][9]
  }
  msigcalc = firstSum * 2 / (10 * period) + curSum * 8 / (10 * period)
  return msigcalc
}

const rsi = function (histData, index, period) {
  let curSum = 0
  for (let i = index; i < index; i++) {
    curSum += histData[i][4]
  }
  const rsicalc = histData[index][4] * 2 / 13 + curSum / 13
  return rsicalc
}


module.exports = { m12ema, m26ema, msig, rsi }