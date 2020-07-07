import React, { useEffect } from "react";

import ProgressiveImage from "./ProgressiveImage/ProgressiveImage";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";

import classes from "./App.module.css";

const App = props => {
  const [node, imageList, loading] = useInfiniteScroll({ rootMargin: "20px" });

  const scroll = imageList.map(image => {
    return (
      <ProgressiveImage
        key={image.id}
        imgClass={classes.customImg}
        divClass={classes.customDiv}
        alt={image.title}
        loadingImg={image.thumbnailUrl}
        src={image.url}
      />
    );
  });

  console.log("App.js:: node:", node);
  console.log("App.js:: imageList:", imageList);
  console.log("App.js:: loading:", loading);
  console.log("App.js:: scroll:", scroll);

  useEffect(() => {
    console.log("App.js:: lifecycle:", "componentDidMount!");
  }, []);

  return (
    <div className={["container", classes.container].join(" ")}>
      {scroll}
      {loading ? (
        <div className={classes.customDiv} ref={node}>
          Loading...
        </div>
      ) : null}
    </div>
  );
};

export default App;
