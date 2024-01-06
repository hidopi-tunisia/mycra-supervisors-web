import axios from 'axios'
import { getAuthorization } from './auth'
import { ENDPOINT } from '@/constants'

const exportCRAToPDF = async (id) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/export/cras/${id}/pdf`, {
    responseType: "blob",
    headers: {
      authorization
    }
  })
}
export { exportCRAToPDF }
