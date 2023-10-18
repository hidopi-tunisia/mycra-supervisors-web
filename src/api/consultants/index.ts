import data from '../dummy/consultants.json'
import history from '../dummy/history.json'
const getConsultants = () => {
  return new Promise((resolve) => resolve({ data }))
}
const getConsultant = (id) => {
  const item = data.find(({ _id }) => _id === id)
  return new Promise((resolve) => resolve({ data: item }))
}
const getHistory = () => {
  return new Promise((resolve) => resolve({ data: history }))
}
export { getConsultants, getConsultant, getHistory }
