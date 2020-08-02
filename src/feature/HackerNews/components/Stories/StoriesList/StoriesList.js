import React from 'react';
import URL from 'url-parse';
import moment from 'moment';
import pluralize from 'pluralize';

import Loading from "../../Loading/Loading";

import classes from './StoriesList.module.scss';

const StoriesList = React.memo(props => {
  const { stories, loading } = props;
  console.log('StoriesList::', stories);
  return (
    <ul className={["list-group", classes.main].join(" ")}>
      {
        loading ? <Loading /> :
          stories.map(story => {
            const { data } = story;
            const link = new URL(data.url);
            const timeFromNow = moment.unix(data.time).fromNow();
            const pointText = (data.score > 1) ? pluralize('point') : 'point';
            const commentText = (data.descendants > 1) ? pluralize('comment') : 'comment';
            return (
              <li key={data.id} className='list-group-item'>
                <span className={classes.title}>{data.title}</span>
                <a href={data.url ? data.url : `https://news.ycombinator.com/item?id=${data.id}`}
                  rel="noopener noreferrer"
                  target="_blank">({ data.url ? link.hostname : 'news.ycombinator.com'})</a>
                <br />
                <span className={classes.text}>{`${data.score} ${pointText} by ${data.by} ${timeFromNow} | ${data.descendants} ${commentText}`}</span>
              </li>
            )
          })
      }
    </ul>
  )
});

export default StoriesList;
