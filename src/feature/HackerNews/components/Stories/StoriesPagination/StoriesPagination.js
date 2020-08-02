import React from 'react';

import classes from './StoriesPagination.module.scss'

const StoriesPagination = props => {

  const { nextPageExists, setPage, page, setLimit, resetPage, limit } = props;

  const nextPageHandler = () => {
    if (nextPageExists) {
      window.scrollTo(0, 0);
      setPage(page => page + 1);
    }
  }

  const previousPageHandler = () => {
    if (page > 0) {
      window.scrollTo(0, 0)
      setPage(page => page - 1);
    }
  }

  const changeLimitHandler = (event) => {
    console.log(event.target.value);
    window.scrollTo(0, 0);
    const newLimit = parseInt(event.target.value, 10) 
    setLimit(newLimit);
    resetPage();
  }

  const disabledClass = 'page-item disabled';

  return (
    <>
      <div className={['row', classes.main].join(' ')}>
        <div className='col-8'>
          <ul className='pagination'>
            <li className={(page <= 0) ? disabledClass : 'page-item'}>
              <button disabled={(page <= 0)}
                onClick={() => previousPageHandler()}
                className='page-link'>Previous Page</button>
            </li>
            <li className={disabledClass}>
              <button disabled
                className='page-link'>
                {page + 1}
              </button>
            </li>
            <li className={(!nextPageExists) ? disabledClass : 'page-item'}>
              <button disabled={!nextPageExists}
                onClick={() => nextPageHandler()}
                className='page-link'>Next Page</button>
            </li>
          </ul>
        </div>
        <div className='col-4'>
          <div className={['form-group form-inline', classes.select].join(' ')}>
            <label className={classes.label} htmlFor='changeLimit'>Limit</label>
            <select id='changeLimit' className='form-control' onChange={changeLimitHandler} value={limit}>
              <option value={5}>5</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
            </select>
          </div>
        </div>
      </div>
    </>
  )
}

export default StoriesPagination;
