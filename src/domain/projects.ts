import axios from 'axios'
import { getAuthorization } from '@/domain/auth'
import { ENDPOINT } from '@/constants'


const createProject = async (clientId, payload) => {
  const authorization = await getAuthorization()
  return axios.post(`${ENDPOINT}/clients/${clientId}/projects`, payload, {
    headers: {
      authorization
    }
  })
}

type GetProjectsOptions = {
  populate?: string
  page?: number
  limit?: number
  sort?: string
}
const getProjects = async ({
  populate = '',
  page = 0,
  limit = 10,
  sort = 'asc'
}: GetProjectsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(
    `${ENDPOINT}/projects?populate=${populate}&page=${page}&limit=${limit}&sort=${sort}`,
    {
      headers: {
        authorization
      }
    }
  )
}

type GetProjectOptions = {
  populate?: string
  count?: string
}
const getProject = async (id, { populate = '', count = '' }: GetProjectOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(`${ENDPOINT}/projects/${id}?populate=${populate}&count=${count}`, {
    headers: {
      authorization
    }
  })
}
type DeleteProjectOptions = {
  keepIdentity: boolean
}
const deleteProject = async (
  id,
  { keepIdentity = false }: DeleteProjectOptions = {
    keepIdentity: false
  }
) => {
  const authorization = await getAuthorization()
  return axios.delete(`${ENDPOINT}/Projects/${id}?keep-identity=${keepIdentity}`, {
    headers: {
      authorization
    }
  })
}
export { createProject, getProjects, getProject, deleteProject }
