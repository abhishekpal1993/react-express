import React from 'react';

import StoriesList from './StoriesList/StoriesList';
import StoriesPagination from './StoriesPagination/StoriesPagination';

import useHackerNews from '../../hooks/useHackerNews';

import classes from './Stories.module.scss';

const Stories = props => {
  const { url, title } = props;
  const [
    loading,
    page,
    limit,
    nextPageExists,
    displayStories,
    refreshTime,
    setLimit,
    setPage,
    resetPage
  ] = useHackerNews(url);

  return (
    <div>
      <div className="row">
        <div className="col-6">
          <h1>{title}</h1>
        </div>
        <div className="col-6">
          <span className={classes.timeUpdated}>
            updated {refreshTime.text}
          </span>
        </div>
      </div>
      <StoriesList loading={loading}
        stories={displayStories} />
      <StoriesPagination nextPageExists={nextPageExists}
        setPage={setPage}
        page={page}
        resetPage={resetPage}
        setLimit={setLimit}
        limit={limit} />
    </div>
  )
}

export default Stories;
