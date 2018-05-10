//Indicator calculations

const m12ema = function (histData, index, period) {
  let firstSum = 0
  for (let i = index; i > index - period; i--) {
    firstSum += histData[i][4]
  }
  let curSum = 0
  for (let i = index - period; i > index - 12 * period; i--) {
    curSum += histData[i][4]
  }
  const m12emaCalc = firstSum * 2 / (13 * period) + curSum / (13 * period)
  return m12emaCalc
}

const m26ema = function (histData, index, period) {
  let firstSum = 0
  for (let i = index; i > index - period; i--) {
    firstSum += histData[i][4]
  }
  let curSum = 0
  for (let i = index - period; i > index - 26 * period; i--) {
    curSum += histData[i][4]
  }
  const m26emaCalc = firstSum * 2 / (27 * period) + curSum / (27 * period)
  return m26emaCalc
}

const msig = function (histData, index, curMave, period) {
  let msigcalc = 0
  let firstSum = curMave
  let curSum = 0
  for (let i = index - 1; i > index - period; i--) {
    firstSum += histData[i][8]
  }
  for (let i = index - period; i > index - period * 8; i--) {
    curSum += histData[i][8]
  }
  msigcalc = (firstSum * 2 / (10 * period)) + (curSum * 8 / (10 * period))
  return msigcalc
}

const rsi = function (histData, index, period) {
  let gain = 0, numGain = 0, loss = 0, numLoss = 0, curPrice = 0, lastPrice = 0, deltaValue = 0
  curPrice = histData[index][4]
  for (let i = index - 1; i > index - 15 * period; i--) {
    lastPrice = curPrice
    curPrice = histData[i][4]
    deltaValue = curPrice - lastPrice
    if (deltaValue >= 0) {
      gain += deltaValue
      numGain += 1
    } else {
      loss += deltaValue
      numLoss += 1
    }
  }
  if (numGain === 0) return 0
  if (numLoss === 0) return 100
  return 100 - 100 / (1 + (gain / numGain) / (Math.abs(loss) / numLoss))
}


module.exports = { m12ema, m26ema, msig, rsi }