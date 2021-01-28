import React from 'react'
import { Input, Select } from 'antd'

import './steps.css'

const { Option } = Select

const Step1 = ({ coverOptions, state, setState }) => {
  const { fullName, coverage } = state

  const handleOptionsChange = coverage => {
    setState({ ...state, coverage })
  }

  const handleNameChange = e => {
    const fullName = e.target.value
    setState({ ...state, fullName })
  }

  return (
    <div className="stepWrapper">
      <p>Your Full Name</p>
      <Input placeholder="Full name" value={fullName || ''} onChange={handleNameChange} style={{ marginBottom: '3rem' }} />
      {coverOptions.value?.length > 0 && (
        <>
          <p>Coverage</p>
          <Select value={coverage || coverOptions.value[0].value} onChange={handleOptionsChange}>
          {coverOptions.value.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)}
          </Select>
        </>
      )}
    </div>
  )
}

export default Step1
