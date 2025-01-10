import React from "react";
import Image from "next/image";
import Link from "next/link";
import style from "./aboutUs.module.scss";
import candidateImage from "@public/image/homeTalking.png";
import employersImage from "@public/image/display.png";
import EllipseCardL from "@public/image/widget/EllipseCardL.svg";
import EllipseCardR from "@public/image/widget/EllipseCardR.svg";
import EllipseResL from "@public/image/widget/EllipseResL.svg";
import arrowRight from "@public/arrowRight.svg";

const AboutUs = () => {
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
            W
          </span>
          hy {""}
          <span>Choose Us?</span>
        </h2>
      </div>

      <div className={style.cards}>
        {/* Candidates Card */}
        <div className={style.cardR}>
          <div className={style.EllipseRes}>
            <Image src={EllipseResL} alt="ellipse" />
          </div>
          <div className={style.EllipseCardL}>
            <Image src={EllipseCardL} alt="ellipse" />
          </div>
          <div className={style.imageWrapper}>
            <Image
              src={candidateImage}
              alt="Candidate with neon lights"
              className={style.image}
            />
          </div>
          <div className={style.content}>
            <span className={style.tag}>Candidates</span>
            <h3>Your Career Journey, Reinvented</h3>
            <p>
              A community that supports you, events that connect you, an academy
              to upskill, and Chanci AI to guide you. All affordable and
              designed to give your career a 100% boost.
            </p>
            <Link href="/boost-career" className={style.button}>
              Boost your career Now
              <Image
                className={style.cardArrow}
                src={arrowRight}
                alt="arrowRight"
              />
            </Link>
          </div>
        </div>

        {/* Employers Card */}
        <div className={style.card}>
          <div className={style.EllipseRes}>
            <Image src={EllipseResL} alt="ellipse" />
          </div>
          <div className={style.EllipseCardR}>
            <Image src={EllipseCardR} alt="ellipse" />
          </div>
          <div className={style.imageWrapper}>
            <Image
              src={employersImage}
              alt="Business people walking"
              className={style.image}
            />
          </div>
          <div className={style.content}>
            <span className={style.tag}>Employers</span>
            <h3>Hire Smarter, Scale Faster</h3>
            <p>
              Access top graduate talents and diversity-focused recruitment.
              Everything is tailored to help your business grow and succeed.
            </p>
            <Link href="/find-talent" className={style.button}>
              Find a Talent Today
              <Image
                className={style.cardArrow}
                src={arrowRight}
                alt="arrowRight"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
