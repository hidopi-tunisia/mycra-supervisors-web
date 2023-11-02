import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetAlertsCountOptions = { isRead?: boolean }
const getAlertsCount = async ({ isRead = null }: GetAlertsCountOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/supervisors/statistics/alerts/count?is-read=${isRead}`, {
    headers: {
      authorization
    }
  })
}
export { getAlertsCount }
