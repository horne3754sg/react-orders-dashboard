import React from 'react'

const Order = ({ data: order }) => {
  return (
    <div
      key={order._id}
      className={`order-item flex-grid status-${order.status.toLowerCase()}`}>
      <div className='col-900-2-24 thumbnail'>
        <img src={order.thumbnail} alt='' />
      </div>
      <div className='col-900-5-24 product-name'>
        <span className='product-brand'>{order.brand}</span>
        <span className='product-model'>{order.model}</span>
      </div>
      <div className='col-900-5-24 product-category'>
        <span className='cell-label'>Category:</span>
        <strong>{order.category}</strong>
      </div>
      <div className='col-900-5-24 product-size'>
        <span className='cell-label'>Size:</span>
        <strong>{order.size}</strong>
      </div>
      <div className='col-900-5-24 product-colour'>
        <span className='cell-label'>Colour:</span>
        <strong>{order.colour}</strong>
      </div>
      <div className='col-900-1-24 customer-initials'>
        <span>{order.customer_initials}</span>
      </div>
    </div>
  )
}

export default Order
