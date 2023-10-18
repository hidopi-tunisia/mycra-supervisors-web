import data from '../dummy/me.json'
const getProfile = () => {
  return new Promise((resolve) => resolve({ data }))
}
export { getProfile }
