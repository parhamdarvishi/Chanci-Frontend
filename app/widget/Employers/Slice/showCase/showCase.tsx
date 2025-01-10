"use client";
import React from "react";
import { Grid } from "@mantine/core";
import styles from "./showCase.module.scss";

const ShowCase = () => {
  return (
    <div>
      <div className={styles.title}>
        <p style={{fontWeight:"bold" , fontSize:"25px"}}>NGN</p >
        <p style={{fontWeight:"lighter" , fontSize:"25px"}}>Talent ShowCase</p>
      </div>

      <Grid gutter="lg" className={styles.gridContainer}>
        <Grid.Col span={6}>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>31.9%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>17%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
        </Grid.Col>

        <Grid.Col span={6}>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
          <div className={styles.gridItem}>
            <p className={styles.percentageText}>11.7%</p>
            <p className={styles.descriptionText}>Technology and software development</p>
          </div>
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ShowCase;
