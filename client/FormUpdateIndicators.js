import React from 'react'

const FormUpdateIndicators = (props) => {
  return (
    <div id='updateIndicators'>
      <form method="POST" onSubmit={props.handleSubmit} >
        <label htmlFor='period'>Period (in hours): </label>
        <input type='text' name='period' />
        <button type="submit" className="btn btn-primary" style={{ background: 'light blue' }}>Update</button>
        <button type='button' onClick={() => { props.handlePullData() }} className="btn btn-primary" style={{ display: 'block', margin: 'auto', background: 'red' }}>Pull Data</button>
      </form>
    </div >
  )
}

export default FormUpdateIndicators
