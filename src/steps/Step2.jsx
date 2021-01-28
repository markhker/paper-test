import React from 'react'
import { Input, Select, Checkbox } from 'antd'

import './steps.css'

const { Option } = Select

const Step2 = ({ constructionTypes, roofTypes, roofConstructionTypes, state, setState }) => {
  const { constructionType, roofType, roofConstructionType, hasMonitoredSystem, otherConstructionType } = state
  const filteredConstructionTypes = constructionTypes.value?.length > 0 && constructionTypes.value?.filter(item => item.value !== 'concrete')

  const handleOptionsChange = (value, name) => {
    setState({ ...state, [name]: value })
  }

  const handleInputChange = e => {
    const value = e.target.value
    setState({ ...state, otherConstructionType: value })
  }

  const handleMonitoredChange = e => {
    const isSelected = e.target.checked
    setState({ ...state, hasMonitoredSystem: isSelected })
  }

  return (
    <div className="stepWrapper">
      {
        state.coverage === 'full'
        ? (
          <>
            {constructionTypes.value?.length > 0 && (
              <>
                <p>Construction Type</p>
                <Select value={constructionType || constructionTypes.value[0].value} onChange={value => handleOptionsChange(value, 'constructionType')} style={{ marginBottom: '2rem' }}>
                {constructionTypes.value.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)}
                </Select>
              </>
            )}
            {constructionType === 'other' && (
              <>
                <p>Specify</p>
                <Input placeholder="Construction type" value={otherConstructionType || ''} onChange={handleInputChange} style={{ marginBottom: '2rem' }} />
              </>
            )}
            {roofTypes.value?.length > 0 && (
              <>
                <p>Roof Type</p>
                <Select value={roofType || roofTypes.value[0].value} onChange={value => handleOptionsChange(value, 'roofType')} style={{ marginBottom: '2rem' }}>
                {roofTypes.value.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)}
                </Select>
              </>
            )}
            {roofConstructionTypes.value?.length > 0 && (
              <>
                <p>Roof Construction Type</p>
                <Select value={roofConstructionType || roofConstructionTypes.value[0].value} onChange={value => handleOptionsChange(value, 'roofConstructionType')} style={{ marginBottom: '2rem' }}>
                {roofConstructionTypes.value.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)}
                </Select>
              </>
            )}
          </>
        ) : (
          <>
            {filteredConstructionTypes.length > 0 && (
              <>
                <p>Construction Type</p>
                <Select value={constructionType || filteredConstructionTypes[0].value} onChange={value => handleOptionsChange(value, 'constructionType')} style={{ marginBottom: '2rem' }}>
                {filteredConstructionTypes.map(option => <Option value={option.value} key={option.value}>{option.label}</Option>)}
                </Select>
              </>
            )}
            {constructionType === 'other' && (
              <>
                <p>Specify</p>
                <Input placeholder="Construction type" value={otherConstructionType || ''} onChange={handleInputChange} style={{ marginBottom: '2rem' }} />
              </>
            )}
          </>
        )
      }
      <Checkbox onChange={handleMonitoredChange} checked={hasMonitoredSystem}>Has a monitored security system?</Checkbox>
    </div>
  )
}

export default Step2
