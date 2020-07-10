import { useState, useRef, useEffect } from "react";
import apiCall from "../utils/MockHttpRequest";

export const useInfiniteScroll = ({
  root = null,
  rootMargin = "0px",
  threshold = 0
}) => {
  const [imageList, setImageList] = useState([]);
  const [loading, setLoading] = useState(true);

  const node = useRef(null);

  // understanding useEffect componentDidMount
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[] -> componentDidMount!");
  }, []);

  // set/unset observer useEffect
  useEffect(() => {
    console.log("useInfiniteScroll.js:useEffect:[node] -> componentDidUpdate!");
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        console.log("useInfiniteScroll.js:observer: entry:", entry);
        if (entry.isIntersecting) {
          const response = apiCall(3);
          if (response.length) {
            setImageList(prevList => [...prevList, ...response]);
          } else {
            setLoading(false);
          }
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
  }, [node, root, rootMargin, threshold]);

  console.log("useInfiniteScroll.js:: node:", node);
  console.log("useInfiniteScroll.js:: loading:", loading);
  console.log("useInfiniteScroll.js:: imageList:", imageList);

  return [node, imageList, loading];
};
