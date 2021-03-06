import React, { useEffect } from "react";

import ProgressiveImage from "./components/ProgressiveImage";
import { useInfiniteScroll } from "./hooks/useInfiniteScroll";

import classes from "./App.module.css";

const App = props => {
  const [node, imageList, loading] = useInfiniteScroll({});

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

  useEffect(() => {
    console.log("App.js:: lifecycle:", "componentDidMount!");
  }, []);

  console.log("App.js:: node:", node);
  console.log("App.js:: imageList:", imageList);
  console.log("App.js:: loading:", loading);
  console.log("App.js:: scroll:", scroll);

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
