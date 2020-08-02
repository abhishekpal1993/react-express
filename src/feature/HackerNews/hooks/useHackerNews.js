import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import moment from 'moment';

const useHackerNews = url => {
  const [totalStories, setTotalStories] = useState([]);
  const [displayStories, setDisplayStories] = useState([]);
  const [refreshTime, setRefreshTime] = useState({
    text: 'just now',
    moment: new moment(),
  });
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [nextPageExists, setNextPageExists] = useState(true);
  const [loading, setLoading] = useState(false);

  const resetPage = useCallback(() => {
    setPage(0);
    setNextPageExists(true);
  }, []);

  useEffect(() => {
    const clock = setInterval(() => {
      setRefreshTime(prevTime => ({
        ...prevTime,
        text: moment(prevTime.moment).fromNow(),
      }));
    }, 10000);

    resetPage();

    return () => clearInterval(clock);
  }, [resetPage, url])

  const getItem = useCallback(
    async (itemId) => {
      const now = moment();
      let itemData = localStorage.getItem(`NAS_DAILY_HACKER_NEWS_${itemId}`);
      try {
        const duration = itemData ? moment.duration(
          moment(JSON.parse(itemData).ls_expiry).diff(now)
        ).get('minutes') : -1;

        if (itemData && duration > 0) {
          return JSON.parse(itemData);
        }
      } catch (error) {
        // console.error('error in diff:', error);
      }

      itemData = await axios.get(`https://hacker-news.firebaseio.com/v0/item/${itemId}.json`)
        .then(response => {
          const ls_expiry = moment().add(10, 'minutes');
          // console.log('useEffect:useHackerNews:itemId:', response.data.type);
          const data = {
            data: response.data,
            error: false,
            ls_expiry,
          };
          localStorage.setItem(`NAS_DAILY_HACKER_NEWS_${itemId}`, JSON.stringify(data));
          return data;
        })
        .catch(error => {
          if (error.response) {
            return ({ data: error.response.data, error: true });
          } else {
            return ({ data: 'no response from server!', error: true });
          }
        });

      return itemData;
    },
    [],
  );

  const getStories = useCallback(
    async () => {
      const itemData = await axios.get(url)
        .then(response => {
          const data = {
            data: response.data,
            error: false,
          };
          return data;
        })
        .catch(error => {
          if (error.response) {
            return ({ data: error.response.data, error: true });
          } else {
            return ({ data: 'no response from server!', error: true });
          }
        });

      return itemData;
    },
    [url],
  );

  useEffect(() => {
    (async () => {
      setLoading(true);
      const stories = await getStories();
      console.log('useEffect:useHackerNews:default:', stories);
      if (!stories.error) {
        setTotalStories(stories.data);
      }
      setLoading(false);
    })();
  }, [getStories]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const storiesCount = totalStories.length;

      const computedStart = page * limit;
      const computedEnd = (computedStart + limit) - 1;

      const start = (storiesCount - 1 >= computedStart) ? computedStart : storiesCount - 1;

      let end = 0;

      if (storiesCount >= computedEnd + 1) {
        setNextPageExists(true);
        end = computedEnd + 1
      } else {
        end = storiesCount;
        setNextPageExists(false);
      }

      const stories = totalStories.slice(start, end);

      const storyDetails = await Promise.all(
        stories.map(async story => {
          const data = await getItem(story);
          return data;
        })
      );

      setDisplayStories(storyDetails);
      console.log('useEffect:useHackerNews:page||limit:', page, limit, start, end, storyDetails);
      setLoading(false);
    })();
  }, [totalStories, limit, page, getItem]);

  return [loading, page, limit, nextPageExists, displayStories, refreshTime, setLimit, setPage, resetPage];
}

export default useHackerNews
