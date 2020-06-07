import React from 'react'
import { leadingZero } from './../../utils/utils'

import './Pagination.scss'

const Pagination = ({ itemsCount, currentPage, pageSize, onPageSelect }) => {
  // hom many pages do we have?
  const pagesCount = Math.ceil(itemsCount / pageSize)

  // Dont show if we only have 1 page
  if (pagesCount <= 1 || pagesCount === undefined) return null

  // create a pages array with the first key as 1
  const pages = [...Array(pagesCount).keys()].map((k) => k + 1)
  const totalPages = pages.length

  return (
    <div className='pagination-container'>
      <div className='pagination-dots'>
        {pages.map((page) => {
          return (
            <span
              key={page}
              className={currentPage === page ? 'active' : ''}
              onClick={() => onPageSelect(page)}></span>
          )
        })}
      </div>
      <div className='pagination-pages'>
        <span className='current-page'>{leadingZero(currentPage)}</span>
        <span className='divider'></span>
        <span className='total-pages'>{leadingZero(totalPages)}</span>
      </div>
    </div>
  )
}

export default Pagination
