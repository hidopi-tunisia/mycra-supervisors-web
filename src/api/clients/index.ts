import data from '../dummy/clients.json'
const getClients = () => {
  return new Promise((resolve) => resolve({ data }))
}
export { getClients }
