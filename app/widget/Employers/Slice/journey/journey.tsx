"use client";
import React from "react";
import Image from "next/image";
import styles from "./journey.module.scss";
import journey from "@public/image/file/invest.png";
import { Button } from "@mantine/core";

const Journey = () => {
  return (
    <div className={styles.journeySection}>
      <div className={styles.imageWrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.neonBorder}>
            <div className={styles.glowEffect} />
            <Image
              src={journey}
              alt="Journey Photo"
              width={500}
              height={400}
              className={styles.image}
            />
            <div className={styles.bottomLine} />
            <div className={styles.rightLine} />
          </div>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <h2>Navigating a Startup Journey?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <div className={styles.dot} />
            <p>Talent Acquisition: Get expert guidance on building your team</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.dot} />
            <p>Pitch Deck Assistance: Refine your pitch with our help</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.dot} />
            <p>Tech & Finance: Navigate complex decisions with ease</p>
          </div>
          <div className={styles.feature}>
            <div className={styles.dot} />
            <p>
              Support for Every Stage: Tailored solutions to fuel your startup's
              growth.
            </p>
          </div>
        </div>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 90 }}
          style={{
            width: "260px",
            borderRadius: "16px",
            gap: "1rem",
            display: "flex",
            alignItems: "center",
          }}
        >
          Book a free Consult
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: "1rem" }}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default Journey;
