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
  status?: string
}
const getProjects = async ({
  populate = '',
  page = 0,
  limit = 10,
  sort = 'asc',
  status = ''
}: GetProjectsOptions = {}) => {
  const authorization = await getAuthorization()
  return axios.get(
    `${ENDPOINT}/projects?populate=${populate}&page=${page}&limit=${limit}&sort=${sort}&status=${status}`,
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
const deleteProject = async (id) => {
  const authorization = await getAuthorization()
  return axios.delete(`${ENDPOINT}/projects/${id}`, {
    headers: {
      authorization
    }
  })
}
const toggleProjectStatus = async ({ id, clientId }) => {
  const authorization = await getAuthorization()
  return axios.patch(`${ENDPOINT}/clients/${clientId}/projects/${id}/status`, null, {
    headers: {
      authorization
    }
  })
}
const assignConsultantToProject = async ({ id, clientId, consultantId }) => {
  const authorization = await getAuthorization()
  return axios.patch(
    `${ENDPOINT}/clients/${clientId}/projects/${id}/consultants/${consultantId}/assign`,
    null,
    {
      headers: {
        authorization
      }
    }
  )
}
export {
  createProject,
  getProjects,
  getProject,
  deleteProject,
  toggleProjectStatus,
  assignConsultantToProject
}
