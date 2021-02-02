import React, { useState, useEffect, createContext } from 'react'
import { useHistory, useLocation } from "react-router-dom"
import { Steps, Button, message } from 'antd'

import { useAsync } from './hooks/useAsync'
import { getResource } from './api'
import './App.css'
import Step1 from './steps/Step1'
import Step2 from './steps/Step2'
import Step3 from './steps/Step3'

const { Step } = Steps

const initialState = {
  fullName: '',
  coverage: '',
  constructionType: '',
  roofType: '',
  roofConstructionType: '',
  hasMonitoredSystem: false,
  otherConstructionType: '',
}

const App = () => {
  const history = useHistory()
  const location = useLocation()
  const [current, setCurrent] = useState(0)
  const [globalState, setGlobalState] = useState(initialState)
  const coverOptions = useAsync(getResource, ['coverOptions'])
  const constructionTypes = useAsync(getResource, ['constructionTypes'])
  const roofTypes = useAsync(getResource, ['roofTypes'])
  const roofConstructionTypes = useAsync(getResource, ['roofConstructionTypes'])
  const calculation = useAsync(getResource, ['calculation'])

  const nextDisabled = globalState.fullName === '' || (globalState.constructionType == 'other' && globalState.otherConstructionType === '')

  const steps = [
    {
      title: 'Insured details & cover options',
      route: '/',
      component: <Step1 coverOptions={coverOptions} state={globalState} setState={setGlobalState} />,
    },
    {
      title: 'Property details',
      route: '/property',
      component: <Step2
                  constructionTypes={constructionTypes}
                  roofTypes={roofTypes}
                  roofConstructionTypes={roofConstructionTypes}
                  state={globalState}
                  setState={setGlobalState} />,
    },
    {
      title: 'Price',
      route: '/price',
      component:  <Step3 calculationData={calculation} coverOptions={coverOptions} state={globalState} setState={setGlobalState} />
    }
  ]

  useEffect(() => {
    const { pathname } = location
    const currentLocationIndex = steps.findIndex(step => step.route === pathname)

    if (currentLocationIndex !== current) {
      setCurrent(currentLocationIndex)
    }
  }, [location])

   useEffect(() => {
    if (coverOptions.value?.length > 0) {
      setGlobalState({ ...globalState, coverage: coverOptions.value[0].value })
    }
    if (constructionTypes.value?.length > 0) {
      setGlobalState({ ...globalState, constructionType: constructionTypes.value[0].value })
    }
    if (roofTypes.value?.length > 0) {
      setGlobalState({ ...globalState, roofType: roofTypes.value[0].value })
    }
    if (roofConstructionTypes.value?.length > 0) {
      setGlobalState({ ...globalState, roofConstructionType: roofConstructionTypes.value[0].value })
    }
  }, [coverOptions.value, constructionTypes.value, roofTypes.value, roofConstructionTypes.value])

  useEffect(() => {
    if (constructionTypes.value?.length > 0) {
      if (globalState.coverage === 'full') {
        setGlobalState({ ...globalState, constructionType: constructionTypes.value[0].value })
      } else {
        setGlobalState({ ...globalState, constructionType: constructionTypes.value[1].value })
      }
    }
  }, [globalState.coverage, constructionTypes.value])

  const next = () => {
    const newCurrent = current + 1
    setCurrent(newCurrent)
    history.push(steps[newCurrent].route)
  }

  const prev = () => {
    const newCurrent = current - 1
    setCurrent(newCurrent)
    history.push(steps[newCurrent].route)
  }

  return (
    <section className="wrapper">
      <Steps size="small" current={current}>
        {steps.map(item => (
          <Step key={item.title} title={item.title} />
        ))}
      </Steps>
      <div className="content">
        {steps[current].component}
      </div>
      <div className="actions">
        {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()} disabled={nextDisabled}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Save Quote
            </Button>
          )}
          {current > 0 && (
            <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
              Previous
            </Button>
          )}
      </div>
    </section>
  )
}

export default App
