import { paginate } from '../utils/paginate'

export function leadingZero(number) {
  if (number > 0 && number < 10) return `0${number}`
  return number
}

export function mapDataToProps(orders) {
  return orders.map((order) => {
    return {
      _id: order._id,
      brand: order.Brand,
      model: order.Product_name,
      thumbnail: order.Product_img,
      category: order.Category,
      size: order.Size,
      colour: order.Colour,
      status: order.Status,
      customer_initials: order.Customer_initials,
    }
  })
}

export function filterResults(items, filterBy) {
  if (filterBy !== null)
    items = items.filter((item) => item.status === filterBy)
  return items
}

export function getPagedData(allItems, filterBy, currentPage, pageSize) {
  // any filtering that needs to be done should be done here first
  let filtered = filterResults(allItems, filterBy)

  // Note: if you need to order the results, do it here

  // finally we will paginate the data here
  const items = paginate(filtered, currentPage, pageSize)

  return { totalCount: filtered.length, data: items }
}
