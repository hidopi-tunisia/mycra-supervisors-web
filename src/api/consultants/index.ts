import data from '../dummy/consultants.json'
const getConsultants = () => {
  return new Promise((resolve) => resolve({ data }))
}
const getConsultant = (id) => {
  const item = data.find(({ _id }) => _id === id)
  return new Promise((resolve) => resolve({ data: item }))
}
export { getConsultants, getConsultant }
