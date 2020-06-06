import React, { Component } from 'react'
import OrderFilters from './OrderFilters'
import OrderResults from './OrderResults'
import Pagination from './common/Pagination'
import { paginate } from '../utils/paginate'

import './OrdersDashboard.scss'

const orderItems = [...Array(20).keys()].map((_id) => {
  return {
    _id,
    thumbnail: '/images/nike-blaze.png',
    brand: 'Nike Air',
    model: `VaporMax 201${_id + 1}`,
    category: 'Men',
    size: 'UK 9',
    colour: 'Blue',
    status: ['READY', 'ONWAY', 'INQUEUE', 'NOSTOCK'][
      Math.floor(Math.random() * 4) // random status
    ],
    customers_initials: 'JD',
  }
})

class OrderDashboard extends Component {
  state = {
    orders: [],
    filterBy: null,
    pageSize: 4,
    currentPage: 1,
  }

  filters = [
    { status: 'READY', label: 'Ready to try' },
    { status: 'ONWAY', label: 'On the way' },
    { status: 'INQUEUE', label: 'In the queue' },
    { status: 'NOSTOCK', label: 'Out of stock' },
  ]

  componentDidMount() {
    this.setState({ orders: orderItems })
  }

  onFilterSelect = (filterBy) => {
    this.setState({ filterBy })
  }

  getPagedData = () => {
    const { orders: allOrders, filterBy, currentPage, pageSize } = this.state

    let filtered = allOrders

    // any filtering that needs to be done should be done here first
    if (filterBy !== null)
      filtered = allOrders.filter((order) => order.status === filterBy)

    // if you need to order the result, do it here

    // finally we will paginate the data here
    const orders = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, data: orders }
  }

  render() {
    const { data: orders } = this.getPagedData()

    return (
      <div className='orders-dashboard'>
        <div className='filters-container'>
          <OrderFilters
            filters={this.filters}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <div className='results-container'>
          <OrderResults orders={orders} />
        </div>
        <div className='pagination-container'>
          <Pagination />
        </div>
      </div>
    )
  }
}

export default OrderDashboard
