import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetClientsCountOptions = {
  status?: 'active' | 'inactive'
}
const getProjectsCount = async ({ status }: GetClientsCountOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/supervisors/statistics/projects/count?status=${status}`, {
    headers: {
      authorization
    }
  })
}
export { getProjectsCount }
