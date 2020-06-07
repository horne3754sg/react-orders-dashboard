import React, { Component } from 'react'
import OrderFilters from './OrderFilters'
import OrderResults from './OrderResults'
import Pagination from './common/Pagination'
import { paginate } from '../utils/paginate'
import { getOrders } from '../services/orderService'

import './OrdersDashboard.scss'

/*
const orderItems = [...Array(20).keys()].map((_id) => {
  return {
    _id,
    brand: 'Nike Air',
    model: `VaporMax 201${_id + 1}`,
    thumbnail: '/images/nike-blaze.png',
    category: 'Men',
    size: 'UK 9',
    colour: 'Blue',
    status: ['READY', 'ONWAY', 'INQUEUE', 'NOSTOCK'][
      Math.floor(Math.random() * 4) // random status
    ],
    customers_initials: 'JD',
  }
})
*/

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

  async componentDidMount() {
    let { data: orders } = await getOrders()
    orders = this.mapDataToProps(orders)
    this.setState({ orders })
  }

  mapDataToProps = (orders) => {
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

  onFilterSelect = (filterBy) => {
    // if the filter is already selected, unset it
    if (this.state.filterBy === filterBy) filterBy = null
    this.setState({ filterBy, currentPage: 1 })
  }

  onPageSelect = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }

  getPagedData = () => {
    const { orders: allOrders, filterBy, currentPage, pageSize } = this.state

    let filtered = allOrders

    // any filtering that needs to be done should be done here first
    if (filterBy !== null)
      filtered = allOrders.filter((order) => order.status === filterBy)

    // Note: if you need to order the result, do it here

    // finally we will paginate the data here
    const orders = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, data: orders }
  }

  render() {
    const { currentPage, pageSize, filterBy } = this.state
    const { totalCount, data: orders } = this.getPagedData()

    return (
      <div className='orders-dashboard'>
        <div className='filters-container'>
          <OrderFilters
            filters={this.filters}
            activeFilter={filterBy}
            onFilterSelect={this.onFilterSelect}
          />
        </div>
        <div className='results-container'>
          <OrderResults orders={orders} />
        </div>

        <Pagination
          itemsCount={totalCount}
          currentPage={currentPage}
          pageSize={pageSize}
          onPageSelect={this.onPageSelect}
        />
      </div>
    )
  }
}

export default OrderDashboard
