import React, { Component } from 'react'

import './OrdersDashboard.scss'

const orderItems = [...Array(5).keys()].map((_id) => {
  return {
    _id,
    thumbnail: 'https://picsum.photos/60/60.jpg',
    name: `Item name ${_id + 1}`,
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
              <div className='col-900-1-12'>
                <img src={order.thumbnail} alt='' />
              </div>
              <div className='col-900-1-12'>{order.name}</div>
              <div className='col-900-1-12'>{order.category}</div>
              <div className='col-900-1-12'>{order.size}</div>
              <div className='col-900-1-12'>{order.colour}</div>
              <div className='col-900-1-12'>{order.customers_initials}</div>
            </div>
          ))}
        </div>
        <div className='pagination-container'></div>
      </div>
    )
  }
}

export default OrdersDashboard
