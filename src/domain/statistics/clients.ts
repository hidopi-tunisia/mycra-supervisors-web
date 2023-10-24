import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetClientsCountOptions = {
  sex?: 'male' | 'female'
}
const getClientsCount = async ({ sex }: GetClientsCountOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/supervisors/statistics/clients/count`, {
    headers: {
      authorization
    }
  })
}
export { getClientsCount }
