"use client";
import React from "react";
import styles from "./showCase.module.scss";

const ShowCase = () => {
  return (
    <div>
      <div className={styles.title}>
        <h2>
          <span
            className={styles.titleH}
            style={{ borderBottom: "4px solid #5e62fc", borderRadius: "4px" }}
          >
            N
          </span>
          GN {""}
          <span className={styles.titleB}>Talent Showcase</span>
        </h2>
      </div>

      <div
        className={styles.gridContainer}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>31.9%</p>
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>17%</p>
            <p className={styles.descriptionText}>Marketing, PR, Media</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>Creative Industries</p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>18.1%</p>
            <p className={styles.descriptionText}>
              Healthcare and Biomedical Sciences
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>13.8%</p>
            <p className={styles.descriptionText}>Finance, Investment</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>7.5%</p>
            <p className={styles.descriptionText}>Education, Research</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
