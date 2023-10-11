import data from '../dummy/clients.json'
const getClients = () => {
  return new Promise((resolve) => resolve({ data }))
}
const getClient = (id) => {
  const item = data.find(({ _id }) => _id === id)
  return new Promise((resolve) => resolve({ data: item }))
}
export { getClients, getClient }
