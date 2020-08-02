import { useState, useRef, useEffect, useCallback } from "react";
import axios from 'axios';

export const useInfiniteScroll = ({
  root = null,
  rootMargin = "0px",
  threshold = 0
}) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const node = useRef(null);

  // fetch images
  const getImagesRequest = useCallback(async (limit = 1, page = 1) => {
    const response = await axios.get(`/api/images?page=${page}&limit=${limit}`);
    const arr = response.data;
    console.log('getImagesRequest::', arr);
    return arr;
  }, []);

  // understanding useEffect componentDidMount
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[] -> componentDidMount!");
  }, []);

  // set/unset observer useEffect
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[node] -> componentDidUpdate!");
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        console.log("useInfiniteScroll.js:eventHandler: entry:", entry);
        if (entry.isIntersecting) {
          (async () => {
            const limit = 3;
            const currentPage = Math.floor(imageList.length / limit);
            const getPage = currentPage + 1;
            const response = await getImagesRequest(limit, getPage);
            if (response.length) {
              setImageList(prevList => [...prevList, ...response]);
            } else {
              setLoading(false);
            }
          })();
        }
      },
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
  }, [node, root, rootMargin, threshold, imageList, getImagesRequest]);

  console.log("useInfiniteScroll.js:: node:", node);
  console.log("useInfiniteScroll.js:: loading:", loading);
  console.log("useInfiniteScroll.js:: imageList:", imageList);

  return [node, imageList, loading];
};
