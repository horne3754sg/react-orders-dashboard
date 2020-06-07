import React, { Component } from 'react'
import OrderFilters from './OrderFilters'
import OrderResults from './OrderResults'
import Pagination from './common/Pagination'
import { paginate } from '../utils/paginate'
import { getOrders } from '../services/orderService'
import { mapDataToProps } from '../utils/utils'

import './OrdersDashboard.scss'

class OrderDashboard extends Component {
  state = {
    orders: [],
    filterBy: null,
    pageCount: 0,
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
    // get the orders from the DB
    let { data: orders } = await getOrders()

    // map the data to the apps props
    orders = mapDataToProps(orders)

    // get the page count
    const pageCount = Math.ceil(orders.length / this.state.pageSize)

    this.setState({ orders, pageCount })
  }

  componentDidUpdate() {
    this.autoRotateNextPage()
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

    // Note: if you need to order the results, do it here

    // finally we will paginate the data here
    const orders = paginate(filtered, currentPage, pageSize)

    return { totalCount: filtered.length, data: orders }
  }

  autoRotateNextPage = () => {
    const { currentPage, pageCount } = this.state

    clearTimeout(this.rotateTimeout)

    if (pageCount <= 1 || pageCount === undefined) return

    const nextPage = currentPage === pageCount ? 1 : currentPage + 1

    this.rotateTimeout = setTimeout(() => {
      this.setState({ currentPage: nextPage })
    }, 10000)
  }

  render() {
    const { currentPage, pageSize, filterBy } = this.state
    const { totalCount, data: orders } = this.getPagedData()

    return (
      <div className='orders-dashboard'>
        <OrderFilters
          filters={this.filters}
          activeFilter={filterBy}
          onFilterSelect={this.onFilterSelect}
        />

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
