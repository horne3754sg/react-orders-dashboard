import React, { Component } from 'react'
import Order from './Order'

class OrderResults extends Component {
  render() {
    return (
      <div className='results-container'>
        <div className='results-list'>
          {this.props.orders.map((order) => (
            <Order key={order._id} data={order} />
          ))}
        </div>
      </div>
    )
  }
}

export default OrderResults
