import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetProjectsCountOptions = {
  status?: 'active' | 'inactive' | ''
  client?: string
}
const getProjectsCount = async ({ status = '', client = '' }: GetProjectsCountOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(
    `${ENDPOINT}/supervisors/statistics/projects/count?status=${status}&client=${client}`,
    {
      headers: {
        authorization
      }
    }
  )
}
export { getProjectsCount }
