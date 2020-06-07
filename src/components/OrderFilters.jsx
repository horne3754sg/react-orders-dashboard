import React from 'react'

import './OrderFilters.scss'

const OrderFilters = ({ filters, onFilterSelect, activeFilter }) => {
  return (
    <div className='filters-container'>
      <ul className='order-filters'>
        {filters.map((filter) => {
          const { status, label } = filter

          let classes = `filter-${status.toLowerCase()}`
          if (activeFilter === status) classes += ' active'

          return (
            <li
              key={status}
              className={classes}
              onClick={() => onFilterSelect(status)}>
              <span className='bullet'>
                <span></span>
              </span>
              <span>{label}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default OrderFilters
