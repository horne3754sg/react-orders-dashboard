import React, { Component } from 'react'
import OrderFilters from './OrderFilters'
import OrderResults from './OrderResults'
import Pagination from './common/Pagination'
import { getOrders } from '../services/orderService'
import { mapDataToProps, filterResults, getPagedData } from '../utils/utils'

import './OrdersDashboard.scss'

class OrderDashboard extends Component {
  state = {
    orders: [],
    filterBy: null,
    pageCount: 0,
    pageSize: 4,
    currentPage: 1,
  }

  // This could be stored in the DB and then referenced as a schema type in mongoose
  filters = [
    { status: 'READY', label: 'Ready to try' },
    { status: 'ONWAY', label: 'On the way' },
    { status: 'INQUEUE', label: 'In the queue' },
    { status: 'NOSTOCK', label: 'Out of stock' },
  ]

  componentDidMount() {
    this.updateOrders()
  }

  componentDidUpdate() {
    this.autoRotateNextPage()
  }

  componentWillUnmount() {
    clearTimeout(this.rotateTimeout)
  }

  updateOrders = async () => {
    // get the orders from the DB
    const { data } = await getOrders()

    // map the data to the apps props
    const orders = mapDataToProps(data)

    // get the page count
    const pageCount = Math.ceil(orders.length / this.state.pageSize)

    this.setState({ orders, pageCount })
  }

  onFilterSelect = (filterBy) => {
    const { filterBy: currentFilterBy, orders: allOrders } = this.state
    // When a filter is selected, we have two possible options:
    // 1. Filter the existing data which would be periodically updated from the DB
    // 2. Request new data each time a filter is toggled using a query param {status: filterBy}

    // if the filter is already selected, unset it
    if (currentFilterBy === filterBy) filterBy = null

    let orders = filterResults(allOrders, filterBy)

    // update page count
    const pageCount = Math.ceil(orders.length / this.state.pageSize)

    this.setState({ filterBy, currentPage: 1, pageCount })
  }

  onPageSelect = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }

  render() {
    const { orders: allOrders, filterBy, currentPage, pageSize } = this.state
    const { totalCount, data: orders } = getPagedData(
      allOrders,
      filterBy,
      currentPage,
      pageSize
    )

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

  autoRotateNextPage = () => {
    const { currentPage, pageCount } = this.state

    clearTimeout(this.rotateTimeout)

    if (pageCount <= 1 || pageCount === undefined) return

    const nextPage = currentPage === pageCount ? 1 : currentPage + 1

    this.rotateTimeout = setTimeout(() => {
      this.updateOrders()
      this.setState({ currentPage: nextPage })
    }, 10000)
  }
}

export default OrderDashboard
