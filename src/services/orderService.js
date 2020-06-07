import http from './httpService'

// this would come from a config file
const apiEndpoint = 'http://localhost:5000/api/orders'

export function getOrders(queryParams) {
  return http.get(apiEndpoint, {
    params: {
      ...queryParams,
    },
  })
}
