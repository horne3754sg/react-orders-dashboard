import React from 'react'

import './OrderFilters.scss'

const OrderFilters = ({ filters, onFilterSelect }) => {
  return (
    <ul className='order-filters'>
      {filters.map((filter) => {
        const { status, label } = filter
        return (
          <li
            key={status}
            className={`filter-${status.toLowerCase()}`}
            onClick={() => onFilterSelect(status)}>
            {label}
          </li>
        )
      })}
    </ul>
  )
}

export default OrderFilters
