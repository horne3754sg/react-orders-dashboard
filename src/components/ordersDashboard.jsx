import React, { Component } from 'react'

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

class ordersDashboard extends Component {
  render() {
    return <div className='orders-dashboard'></div>
  }
}

export default ordersDashboard
