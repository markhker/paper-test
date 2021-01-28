export const getResource = async params => {
  const url = `http://localhost:4006/${params}`
  const response = await fetch(url)
  const result = await response.json()
  return result
}
