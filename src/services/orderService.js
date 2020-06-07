import http from './httpService'

// this would come from a config file
const apiEndpoint = 'http://localhost:5000/api/orders'

export function getOrders() {
  return http.get(apiEndpoint)
}
