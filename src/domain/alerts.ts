import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetAlertsOptions = {
  page?: number
  limit?: number
  sort?: string
  consultant?: string
}
const getAlerts = async ({
  page = 0,
  limit = 10,
  sort = 'asc',
  consultant = ''
}: GetAlertsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(
    `${ENDPOINT}/me/alerts?page=${page}&limit=${limit}&sort=${sort}&consultant=${consultant}`,
    {
      headers: {
        authorization
      }
    }
  )
}
export { getAlerts }
