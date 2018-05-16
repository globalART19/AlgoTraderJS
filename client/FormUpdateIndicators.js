import React from 'react'

const FormUpdateIndicators = (props) => {
  return (
    <div id='updateIndicators'>
      <form method="POST" onSubmit={props.handleSubmit} onChange={props.handleChange} >
        <label htmlFor='period'>Period (in hours): </label>
        <input type='text' name='period' />
        <button type="submit" className="btn btn-primary" style={{ background: 'light blue' }}>Update</button>
      </form>
    </div >
  )
}

export default FormUpdateIndicators
