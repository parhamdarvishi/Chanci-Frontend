"use client";
import React from "react";
import { Grid } from "@mantine/core";
import styles from "./showCase.module.scss";

const ShowCase = () => {
  return (
    <div>
      <div className={styles.title}>
        <h2 style={{ fontSize: "42px" }}>
          <span
            style={{
              borderBottom: "4px solid #5E62FC",
              borderRadius: "4px",
              fontWeight: "700",
              fontSize: "42px",
            }}
          >
            N
          </span>
          GN {""}
          <span style={{ fontWeight: "400", fontSize: "42px" }}>
            Talent Showcase
          </span>
        </h2>
      </div>

      <Grid gutter="lg" justify="center" className={styles.gridContainer}>
        <Grid.Col
          span={{ base: 12, md: 6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
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
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 6 }}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>
              Technology and software development
            </p>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ShowCase;
