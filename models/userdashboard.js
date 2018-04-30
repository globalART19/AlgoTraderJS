const express = require('express')
const { db } = require('../models')
const Gdax = require('gdax')
const publicClient = new Gdax.PublicClient();

const product = 'BTC-USD'
const granularity = 86400
// 60, 300, 900, 3600, 21600, 86400

async function getHistoricalData() {
  try {
    await publicClient.getProductHistoricRates(product, { granularity: granularity }, (err, res, data) => {
      if (err) { throw err }
      const [hdtime, hdlow, hdhigh, hdopen, hdclose, hdvolume] = async () => {
        let date = new Date(0)
        await db.HistoricalData.findOrCreate({
          where: {
            time: date.setUTCSeconds(+data[1][0]),
            low: Math.round(+data[1][1] * 100),
            high: Math.round(+data[1][2] * 100),
            open: Math.round(+data[1][3] * 100),
            close: Math.round(+data[1][4] * 100),
            volume: Math.round(+data[1][5] * 100)
          }
        })
      }
      // [ time, low, high, open, close, volume ],
      // [ 1415398768, 0.32, 4.2, 0.35, 4.2, 12.3 ]
    })
  } catch (e) {
    throw (e)
  }
}

module.exports = { getHistoricalData }


// async function yourFunction() {
//   try {
//     const products = await publicClient.getProducts();
//   } catch (error) {
//     /* ... */
//   }
// }

// publicClient.getProducts((error, response, data) => {
//   if (error) {
//     // handle the error
//   } else {
//     // work with data
//   }
// });

// publicClient.getProductOrderBook('BTC-USD', { level: 3 }).then(book => {
//   /* ... */
// });
// publicClient.getProductOrderBook(
//   'ETH-USD',
//   { level: 3 },
//   (error, response, book) => {
//     /* ... */
//   }
// );

