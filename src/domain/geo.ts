import axios from 'axios'

const SEARCH_URL = 'https://nominatim.openstreetmap.org/search'

const searchPlace = (text) => {
  return axios.get(`${SEARCH_URL}?format=json&q=${text}`)
}

export { searchPlace }
