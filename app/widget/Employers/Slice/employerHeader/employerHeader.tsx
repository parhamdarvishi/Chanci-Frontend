import React from "react";
import style from "./employerHeader.module.scss";
import { Button } from "@mantine/core";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";

const EmployerHeader = () => {
  return (
    <>
      <div className={style.imageWrapper}>
        <div className={style.imageContainer}>
          <h2 className={style.h4cl}>Unlock Smarter Talent Acquisition</h2>
          <p>Future-proof your team with bright talents and top graduates!</p>
          <Button
            size="lg"
            variant="gradient"
            gradient={{ from: "grape", to: "indigo", deg: 90 }}
            className={style.btn}
          >
            Post a job with us
            <Image
              className={style.cardArrow}
              src={arrowRight}
              alt="arrowRight"
              width={22}
            />
          </Button>
        </div>
      </div>
    </>
  );
};

export default EmployerHeader;
