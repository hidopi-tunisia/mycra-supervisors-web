import axios from 'axios'
import { getAuthorization } from './auth'
import { ENDPOINT } from '@/constants'

const getCRA = async (id, { populate = '', count = '', total = 'true' } = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/cras/${id}?populate=${populate}&count=${count}$total=${total}`, {
    headers: {
      authorization
    }
  })
}
const rejectCRA = async (id, motive) => {
  const authorization = await getAuthorization()
  return axios.patch(
    `${ENDPOINT}/cras/${id}/reject`,
    {
      motive
    },
    {
      headers: {
        authorization
      }
    }
  )
}
const approveCRA = async (id) => {
  const authorization = await getAuthorization()
  return axios.patch(`${ENDPOINT}/cras/${id}/approve`, null, {
    headers: {
      authorization
    }
  })
}
export { getCRA, rejectCRA, approveCRA }
