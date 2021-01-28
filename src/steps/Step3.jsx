import React from 'react'
import { Spin } from 'antd'

import './steps.css'

const Step3 = ({ calculationData, coverOptions, state, setState }) => {
  console.log('🚀 ~ file: Step3.jsx ~ line 7 ~ Step3 ~ coverOptions', coverOptions)
  console.log('🚀 ~ file: Step3.jsx ~ line 9 ~ Step3 ~ calculationData', calculationData)
  const { fullName, coverage, constructionType, roofType, roofConstructionType, hasMonitoredSystem } = state
  const coverOptionSelected = coverOptions.value?.length > 0 && coverOptions.value.filter(item => item.value === coverage)[0].label

  const getMinimumPrice = () => {
    if (calculationData.value?.length > 0) {
      const { constructionTypesPrices, monitoredSystemDiscount, roofConstructionTypesPrices, roofTypesModifiers } = calculationData.value[0]
      if (coverage === 'full') {
        const constructionPrice = constructionTypesPrices[constructionType] || 0
        if (constructionPrice === 0) { return 0 }
        const modifier = roofTypesModifiers[roofType]
        const roofPrice = roofConstructionTypesPrices[roofConstructionType]
        let minimumPrice = constructionPrice + (roofPrice * modifier)
        if (hasMonitoredSystem) { minimumPrice -= monitoredSystemDiscount }
        return minimumPrice
      } else if (coverage === 'minimum') {
        let constructionPrice = constructionTypesPrices[constructionType] || 0
        if (constructionPrice === 0) { return 0 }
        if (hasMonitoredSystem) { constructionPrice -= monitoredSystemDiscount }
        return constructionPrice
      } else {
        return 0
      }
    }
  }

  // const handleOptionsChange = coverage => {
  //   setState({ ...state, coverage })
  // }

  // const handleNameChange = e => {
  //   const fullName = e.target.value
  //   setState({ ...state, fullName })
  // }

  return (
    <div className="stepWrapper">
      {calculationData.loading
      ? (
        <Spin size="large" />
      ) : (
        <>
          {constructionType === 'other'
            ? <h2>"{fullName}, please contact us to get an accurate quote for your property insurance."</h2>
            : (
              <>
              {coverage === 'full'
              ? (
                getMinimumPrice() > 0
                ? <h2>"{fullName}, we can insure your property with the coverage {coverOptionSelected} at a minimum price of {getMinimumPrice()}</h2>
                : <h2>"{fullName}, please contact us to get an accurate quote for your property insurance."</h2>
              ) : (
                getMinimumPrice() > 0
                ? <h2>"{fullName}, we can insure your property with the coverage {coverOptionSelected} at a minimum price of {getMinimumPrice()}</h2>
                : <h2>"{fullName}, please contact us to get an accurate quote for your property insurance."</h2>
              )}
              </>
            )}
        </>
      )}
    </div>
  )
}

export default Step3
