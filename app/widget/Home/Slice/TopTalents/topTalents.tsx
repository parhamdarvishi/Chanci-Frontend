"use client";
import React, { useState } from "react";
import Image from "next/image";
import Empowering from "@public/image/homeWalk.png";
import style from "./topTalents.module.scss";

const TopTalents = () => {
  const [activeTab, setActiveTab] = useState("chanci");

  const tabs = [
    {
      id: "chanci",
      title: "Chanci AI",
      description:
        "A unique psychological assessment that combines results with up-to-date job market data and skill analysis to bring a one-of-a-kind career guide for top talents with options to apply for.",
    },
    {
      id: "education",
      title: "Education",
      description:
        "We partner with academic institutions to offer career development programmes, linking education to the job market.",
    },
    {
      id: "employers",
      title: "Employers",
      description:
        "NGN enhances employer branding, brings top talent into the spotlight, and helps companies adapt to Gen Z culture.",
    },
    {
      id: "startups",
      title: "Startups",
      description:
        "Co-founder matching events, educational programmes, and consultancy services for startups and founders.",
    },
  ];

  return (
    <div className={style.wrapper}>
      <div className={style.imageSection}>
        <Image
          src={Empowering}
          alt="Modern office building"
          width={500}
          height={600}
          className={style.image}
        />
      </div>

      <div className={style.content}>
        <h2 className={style.title}>
          Empowering Top Talents,
          <br />
          Transforming Futures.
        </h2>
        <div className={style.underline}></div>

        <div className={style.descriptionSection}>
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`${style.descriptionBlock} ${
                activeTab === tab.id ? style.active : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <h3>{tab.title}</h3>
              <p>{tab.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopTalents;
