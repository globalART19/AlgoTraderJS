import React from 'react'
import axios from 'axios'


class AlgorithmResults extends React.Component {
  constructor() {
    super()
    this.state = {
      maxReturn: 0,
      algoReturn: 0
    }
  }
  async componentDidMount() {
    const res = await axios.get('/api/algorithm')
    const maxReturn = res.data.maxReturn
    const algoReturn = res.data.algoReturn
    this.setState({ maxReturn, algoReturn })
  }
  async handleCalcReturns() {
    await axios.post('/api/algorithm')
    const res = await axios.get('/api/algorithm')
    const maxReturn = res.data.maxReturn
    const algoReturn = res.data.algoReturn
    this.setState({ maxReturn, algoReturn })
  }
  render() {
    return (
      <div>
        <h2>Return per BTC</h2>
        <h3>Max Return: ~$15 million trillion </h3>
        <h3>Algo Return: ${this.state.algoReturn}</h3>
        <button type='button' onClick={() => { this.handleCalcReturns() }} className="btn btn-primary" style={{ margin: 'auto', background: 'red' }}>Calc Returns</button>
      </div>
    )
  }
}

export default AlgorithmResults

// Display interactive chart of algorithm results across the data set
// Button to go back to algorithmform to update inputs
// Include ways to search specific date ranges, turn indicators on/off, etc
// Would be cool to build something really sleek here
