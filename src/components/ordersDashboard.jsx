import React, { Component } from 'react'
import OrderFilters from './OrderFilters'
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
  state = {
    orders: [],
    filterBy: null,
  }

  componentDidMount() {
    this.setState({ orders: orderItems })
  }

  filters = [
    { status: 'READY', label: 'Ready to try' },
    { status: 'ONWAY', label: 'On the way' },
    { status: 'INQUEUE', label: 'In the queue' },
    { status: 'NOSTOCK', label: 'Out of stock' },
  ]

  onFilterSelect = (filterBy) => {
    console.log(filterBy)
    this.setState({ filterBy })
  }

  render() {
    return (
      <div className='orders-dashboard'>
        <div className='filters-container'>
          <OrderFilters
            filters={this.filters}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <div className='results-container'>
          <OrderResults orders={this.state.orders} />
        </div>
        <div className='pagination-container'></div>
      </div>
    )
  }
}

export default OrderDashboard
