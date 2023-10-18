import data from '../dummy/projects.json'
const getProjects = () => {
  return new Promise((resolve) => resolve({ data }))
}
export { getProjects }
