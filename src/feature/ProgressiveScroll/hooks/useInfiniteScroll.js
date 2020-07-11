import { useState, useRef, useEffect, useCallback } from "react";
import axios from 'axios';

const dummyHttpRequest = async(limit = 1, page = 1) => {
  const response = await axios.get(`http://localhost:8080/api/images?page=${page}&limit=${limit}`);
  const arr = response.data;
  console.log('dummyHttpRequest::', arr);
  return arr;
};

export const useInfiniteScroll = ({
  root = null,
  rootMargin = "0px",
  threshold = 0
}) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const node = useRef(null);

  // understanding useEffect componentDidMount
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[] -> componentDidMount!");
  }, []);

  const eventHandler = useCallback(([entry]) => {
    console.log("useInfiniteScroll.js:eventHandler: entry:", entry, page);
    if (entry.isIntersecting) {
      (async () => {
        const response = await dummyHttpRequest(3, page);
        if (response.length) {
          setImageList(prevList => [...prevList, ...response]);
          setPage(prev => prev+1);
        } else {
          setLoading(false);
        }
      })();
    }
  }, [page]);

  // set/unset observer useEffect
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[node] -> componentDidUpdate!");
    const observer = new window.IntersectionObserver(
      eventHandler,
      {
        root,
        rootMargin,
        threshold
      }
    );

    if (node.current) observer.observe(node.current);

    return () => {
      console.log(
        "useInfiniteScroll.js:useEffect:[node] -> componentWillUnMount!",
        observer
      );
      observer.disconnect();
    };
  }, [node, root, rootMargin, threshold, eventHandler]);

  console.log("useInfiniteScroll.js:: node:", node);
  console.log("useInfiniteScroll.js:: loading:", loading);
  console.log("useInfiniteScroll.js:: imageList:", imageList);

  return [node, imageList, loading];
};
