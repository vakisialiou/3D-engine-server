import config from './web.config.yml'
import objectPath from 'object-path'
import yml from 'js-yaml'

const data = yml.safeLoad(config.body, 'utf8')
export const API_URL = objectPath.get(data, 'apiUrl', 'http://localhost:5000')