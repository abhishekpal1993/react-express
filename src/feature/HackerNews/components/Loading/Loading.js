import React from 'react';

import classes from './Loading.module.scss';

const Loading = () => (
  <div className={classes.spinner}>
    <div className={["spinner-grow spinner-grow-sm text-primary", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-secondary", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-success", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-danger", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-warning", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-info", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
    <div className={["spinner-grow spinner-grow-sm text-dark", classes.spinnerGrow].join(" ")}>
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Loading;
