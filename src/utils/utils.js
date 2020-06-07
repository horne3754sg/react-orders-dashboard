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
