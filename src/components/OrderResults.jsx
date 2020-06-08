import React, { Component } from 'react'
import Order from './Order'

class OrderResults extends Component {
  render() {
    return (
      <div className='results-group'>
        {this.props.orders.length === 0 && (
          <div className='empty-results'>
            <span> No orders at this time :-(</span>
          </div>
        )}
        {this.props.orders.map((order) => (
          <Order key={order._id} data={order} />
        ))}
      </div>
    )
  }
}

export default OrderResults
