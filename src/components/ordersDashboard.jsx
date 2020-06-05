import React, { Component } from 'react'

import './OrdersDashboard.scss'

const orderItems = [...Array(5).keys()].map((_id) => {
  return {
    _id,
    thumbnail: 'https://picsum.photos/70/70.jpg',
    brand: 'Nike Air',
    model: `VaporMax 201${_id + 1}`,
    category: 'Men',
    size: 'UK 9',
    colour: 'Blue',
    status: 'READY',
    customers_initials: 'JD',
  }
})

class OrdersDashboard extends Component {
  render() {
    return (
      <div className='orders-dashboard'>
        <div className='filters-container'></div>
        <div className='results-container'>
          {orderItems.map((order) => (
            <div
              className={`order-item flex-grid status-${order.status.toLowerCase()}`}>
              <div className='col-900-1-10 thumbnail'>
                <img src={order.thumbnail} alt='' />
              </div>
              <div className='col-900-3-10 product-name'>
                <span className='product-brand'>{order.brand}</span>
                <span className='product-model'>{order.model}</span>
              </div>
              <div className='col-900-2-10 product-category'>
                <span className='cell-label'>Category:</span>{' '}
                <strong>{order.category}</strong>
              </div>
              <div className='col-900-2-10 product-size'>
                <span className='cell-label'>Size:</span>
                <strong>{order.size}</strong>
              </div>
              <div className='col-900-2-10 product-colour'>
                <span className='cell-label'>Colour:</span>
                <strong>{order.colour}</strong>
              </div>
              <div className='customer-initials'>
                <span>{order.customers_initials}</span>
              </div>
            </div>
          ))}
        </div>
        <div className='pagination-container'></div>
      </div>
    )
  }
}

export default OrdersDashboard
