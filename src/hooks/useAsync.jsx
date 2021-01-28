import React, { useState, useEffect } from 'react'

export const useAsync = (getMethod, params) => {
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const getResource = async () => {
    try {
      setLoading(true)
      const result = await getMethod(...params)
      setValue(result)
    } catch (e) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getResource()
  }, params)

  return { value, error, loading }
}
