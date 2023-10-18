import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

const createClient = async (payload) => {
  const authorization = await getAuthorization()
  return axios.post(`${ENDPOINT}/clients`, payload, {
    headers: {
      authorization
    }
  })
}

type GetClientsOptions = {
  populate?: string
  page?: number
  limit?: number
  sort?: string
}
const getClients = async ({
  populate = '',
  page = 0,
  limit = 10,
  sort = 'asc'
}: GetClientsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/clients?populate=${populate}&page=${page}&limit=${limit}&sort=${sort}`, {
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
  return axios.get(`${ENDPOINT}/clients/${id}?populate=${populate}&count=${count}`, {
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
  return axios.delete(`${ENDPOINT}/clients/${id}?keep-identity=${keepIdentity}`, {
    headers: {
      authorization
    }
  })
}
export { createClient, getClients, getClient, deleteClient }
