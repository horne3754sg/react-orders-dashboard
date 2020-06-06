import React, { Component } from 'react'
import OrderResults from './OrderResults'

import './OrdersDashboard.scss'

const orderItems = [...Array(5).keys()].map((_id) => {
  return {
    _id,
    thumbnail: '/images/nike-blaze.png',
    brand: 'Nike Air',
    model: `VaporMax 201${_id + 1}`,
    category: 'Men',
    size: 'UK 9',
    colour: 'Blue',
    status: 'READY',
    customers_initials: 'JD',
  }
})

class OrderDashboard extends Component {
  render() {
    return (
      <div className='orders-dashboard'>
        <div className='filters-container'></div>
        <div className='results-container'>
          <OrderResults orders={orderItems} />
        </div>
        <div className='pagination-container'></div>
      </div>
    )
  }
}

export default OrderDashboard
