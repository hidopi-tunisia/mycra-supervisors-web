import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

type GetAlertsCountOptions = {}
const getAlertsCount = async () => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/supervisors/statistics/alerts/count`, {
    headers: {
      authorization
    }
  })
}
export { getAlertsCount }
