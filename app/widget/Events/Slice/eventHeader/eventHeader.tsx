import React from "react";
import style from "./eventHeader.module.scss";

const EventHeader = () => {
  return (
    <>
      <div className={style.imageWrapper}>
        <div className={style.imageContainer}>
          <h2 className={style.h4cl}>Events by NGN</h2>
          <p>We hosted, We gathered, We created</p>
        </div>
      </div>
    </>
  );
};

export default EventHeader;
