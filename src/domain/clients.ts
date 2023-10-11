import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

const createClient = async (payload) => {
  const authorization = await getAuthorization()
  return axios.post(`${ENDPOINT}/consultants`, payload, {
    headers: {
      authorization
    }
  })
}

type GetClientsOptions = {
  populate?: string
}
const getClients = async ({ populate = '' }: GetClientsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/consultants?populate=${populate}`, {
    headers: {
      authorization
    }
  })
}

type GetClientOptions = {
  populate?: string
  count?: string
}
const getClient = async (id, { populate = '', count = '' }: GetClientOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/consultants/${id}?populate=${populate}&count=${count}`, {
    headers: {
      authorization
    }
  })
}
type DeleteClientOptions = {
  keepIdentity: boolean
}
const deleteClient = async (
  id,
  { keepIdentity = false }: DeleteClientOptions = {
    keepIdentity: false
  }
) => {
  const authorization = await getAuthorization()
  return axios.delete(`${ENDPOINT}/consultants/${id}?keep-identity=${keepIdentity}`, {
    headers: {
      authorization
    }
  })
}
export { createClient, getClients, getClient, deleteClient }
