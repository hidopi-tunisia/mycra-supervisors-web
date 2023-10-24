import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetConsultantsCountOptions = {
  status?: 'active' | 'inactive'
}
const getConsultantsCount = async ({ status }: GetConsultantsCountOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/supervisors/statistics/consultants/count?status=${status}`, {
    headers: {
      authorization
    }
  })
}
export { getConsultantsCount }
