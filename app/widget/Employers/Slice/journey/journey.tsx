"use client";
import React from "react";
import Image from "next/image";
import styles from "./journey.module.scss";
import journey from "@public/image/file/imageCard.png";
import tickCircle from "@public/image/icons/tickCircle.svg";
import bookBtn from "@public/image/icons/bookBtn.svg";
import arrowL from "@public/image/icons/arrowL.svg";

const Journey = () => {
  return (
    <div className={styles.journeySection}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <Image src={journey} alt="journey" />
        </div>
      </div>
      <div className={styles.contentContainer}>
        <h2>Navigating a Startup Journey?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <Image src={tickCircle} alt="check" width={24} />
            <p>Talent Acquisition: Get expert guidance on building your team</p>
          </div>
          <div className={styles.feature}>
            <Image src={tickCircle} alt="check" width={24} />
            <p>Pitch Deck Assistance: Refine your pitch with our help</p>
          </div>
          <div className={styles.feature}>
            <Image src={tickCircle} alt="check" width={24} />
            <p>Tech & Finance: Navigate complex decisions with ease</p>
          </div>
          <div className={styles.feature}>
            <Image src={tickCircle} alt="check" width={24} />
            <p>
              Support for Every Stage: Tailored solutions to fuel your startups
              growth.
            </p>
          </div>
          <div className={styles.arrow}>
            <Image src={arrowL} alt="arrowL" width={110} />
          </div>
        </div>
        <Image src={bookBtn} alt="bookBtn" style={{ cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Journey;
