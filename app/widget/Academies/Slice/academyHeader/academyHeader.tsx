import React from "react";
import style from "./academyHeader.module.scss";

const AcademyHeader = () => {
  return (
    <>
      <div className={style.imageWrapper}>
        <div className={style.imageContainer}>
          <h2 className={style.h4cl}>Knowledge, </h2>
          <p>but make it a vibe</p>
        </div>
      </div>
    </>
  );
};

export default AcademyHeader;
