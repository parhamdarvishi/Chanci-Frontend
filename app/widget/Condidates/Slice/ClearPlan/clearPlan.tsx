import React from "react";
import style from "./clearPlan.module.scss";
import { Card } from "@mantine/core";
import Image from "next/image";
import circle from "@public/image/widget/circle.png";
import Title from "@public/image/widget/Frame.svg";
import line from "@public/image/widget/Line.svg";
import line2 from "@public/image/widget/Line2.svg";

const ClearPlan = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h2>
          <span
            style={{
              borderBottom: "4px solid #5E62FC",
              borderRadius: "4px",
              fontWeight: "400",
            }}
          >
            N
          </span>
          eed {""}
          <span>a Clear Plan </span>
          for Your Career?
        </h2>
        <p className={style.desc}>
          Figuring out your next steps after uni can feel overwhelming. The job
          market is tough, and most career advice out there is either too
          generic or doesn’t give you clear direction. We are here to shorten
          your job search time.
        </p>
      </div>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className={style.card}
      >
        <div className={style.cardCircle}>
          <Image src={circle} alt="circle" />
        </div>
        <Image src={line} alt="line" className={style.cardLine} />
        <Image src={line2} alt="line" className={style.cardSLine} />
        <div className={style.cardTitle}>
          <Image src={Title} alt="Title" width={240} />
        </div>
        <div className={style.cardBody}>
          <div className={style.cardSpanPart}>
            <p>
              It looked into my personality, and the analysis completely wowed
              me!
            </p>
            <span className={style.cardSpan}> Alex, Cardiology Resident</span>
          </div>
          <div className={style.cardSpanPart}>
            <p>
              It Made everything about my next career move so clear. Seriously,
              mind blown!
            </p>
            <span className={style.cardSpan}>Mia, Bsc in Computer Science</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ClearPlan;
