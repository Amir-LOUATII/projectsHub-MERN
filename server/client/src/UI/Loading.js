import React from "react";
import classes from "./Loading.module.css";

const Loading = () => {
  return (
    <section className={classes.section}>
      <div className={classes.loading}></div>
    </section>
  );
};

export default Loading;
