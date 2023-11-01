import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

const send = async (payload) => {
  const authorization = await getAuthorization()
  return axios.post(`${ENDPOINT}/messaging`, payload, {
    headers: {
      authorization
    }
  })
}

export { send }
