import Image from "next/image";
import React from "react";
import sectionRes from "@public/image/responsive/chanciChartRes.png";
import section from "@public/image/file/sectionChanci.png";
import rightEllipse from "@public/image/file/rightEllipse.svg";
// import leftEllipse from "@public/image/file/leftEllipse.svg";
import style from "./section.module.scss";

const Section = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.rightEllipse}>
        <Image src={rightEllipse} alt="ellipse" />
      </div>
      <div className={style.sectionBox}>
        <Image src={section} alt="section" className={style.section} />
        <Image src={sectionRes} alt="section" className={style.sectionRes} />
      </div>
    </div>
  );
};

export default Section;
