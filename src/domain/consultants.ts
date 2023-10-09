import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'

const createConsultant = async (payload) => {
  const authorization = await getAuthorization()
  return axios.post(`${ENDPOINT}/consultants`, payload, {
    headers: {
      authorization
    }
  })
}

type GetConsultantsOptions = {
  populate?: string
}
const getConsultants = async ({ populate = '' }: GetConsultantsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/consultants?populate=${populate}`, {
    headers: {
      authorization
    }
  })
}

type GetConsultantOptions = {
  populate?: string
  count?: string
}
const getConsultant = async (id, { populate = '', count = '' }: GetConsultantOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/consultants/${id}?populate=${populate}&count=${count}`, {
    headers: {
      authorization
    }
  })
}
type DeleteConsultantOptions = {
  keepIdentity: boolean
}
const deleteConsultant = async (
  id,
  { keepIdentity = false }: DeleteConsultantOptions = {
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
export { createConsultant, getConsultants, getConsultant, deleteConsultant }
