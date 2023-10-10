import data from '../dummy/consultants.json'
const getConsultants = () => {
  return new Promise((resolve) => resolve({ data }))
}
export { getConsultants }
