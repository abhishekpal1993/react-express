import React, { useState } from "react";

import classes from "./ProgressiveImage.module.css";

const omit = (obj, omitKeyArr) =>
  Object.keys(obj).reduce((acc, key) => {
    if (!omitKeyArr.includes(key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});

const ProgressiveImage = props => {
  const [highResImageLoaded, setHighResImageLoaded] = useState(false);
  const [hideProgressiveImage, setHideProgressiveImage] = useState(false);

  let filteredProps = omit(props, ["loadingImg", "divClass", "imgClass"]);

  const progressiveImageDiv = [
    props.divClass,
    highResImageLoaded ? null : classes.progressiveImageDiv
  ].join(" ");

  const progressiveImageImg = [
    highResImageLoaded ? null : classes.progressiveImageImg,
    props.imgClass,
    classes.progressiveImageBlur
  ].join(" ");

  const originalImg = [
    highResImageLoaded ? null : classes.progressiveImageImg,
    props.imgClass
  ].join(" ");

  return (
    <div className={progressiveImageDiv}>
      <img
        {...filteredProps}
        alt={props.alt}
        onLoad={() => {
          setHighResImageLoaded(true);
          setTimeout(() => {
            setHideProgressiveImage(true);
          }, 400);
        }}
        className={originalImg}
        src={props.src}
      />
      {hideProgressiveImage ? null : (
        <img
          {...filteredProps}
          {...highResImageLoaded && { style: { opacity: "0" } }}
          alt={props.alt}
          className={progressiveImageImg}
          src={props.loadingImg}
        />
      )}
    </div>
  );
};

export default React.memo(ProgressiveImage);
