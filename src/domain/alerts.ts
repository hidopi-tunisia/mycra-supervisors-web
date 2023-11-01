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
const toggleAlertIsRead = async (id) => {
  const authorization = await getAuthorization()
  return axios.patch(`${ENDPOINT}/me/alerts/${id}/is-read`, null, {
    headers: {
      authorization
    }
  })
}
const deleteAlert = async (id) => {
  const authorization = await getAuthorization()
  return axios.delete(`${ENDPOINT}/me/alerts/${id}`, {
    headers: {
      authorization
    }
  })
}
export { getAlerts, toggleAlertIsRead, deleteAlert }
