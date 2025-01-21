"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import business from "@public/image/business.svg";
import event from "@public/image/events/sponser.svg";
import eventBtn from "@public/image/events/GetInTouch.svg";
import ellipse from "@public/image/EllipseBg.svg";
import arrowR from "@public/image/icons/arrowR.svg";
import styles from "./Businesses.module.scss";
import Link from "next/link";

const Businesses = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSection}>
          <Image src={ellipse} alt="ellipse" className={styles.ellipsBg} />
          <Image
            src={arrowR}
            alt="ellipse"
            className={styles.arrowR}
            width={110}
          />
          <Image
            className={styles.arrowI}
            src={event}
            alt="event"
            width={140}
            height={54}
          />
          <h2>Unique Opportunity for Businesses</h2>
          <p>
            {isMobile
              ? "A community that supports you, events that connect you, an academy to upskill, and Chanci AI to guide you. All affordable and designed to give your career a 100% boost."
              : "The sponsorship scheme is designed to give businesses and founders " +
                "the opportunity to promote their work and products. With a tailored " +
                "program, you will be introduced to guests and secure your place. " +
                "Ideal for brand awareness, personal branding, and lead generation. " +
                "Get in touch with the NGN team to discuss which events you can " +
                "sponsor based on your budget and facilities."}
          </p>
          <div style={{ cursor: "pointer", zIndex: "100" }}>
            <Link href="/Events">
              <Image src={eventBtn} className={styles.eventB} alt="eventBtn" />
            </Link>
          </div>
        </div>

        <div className={styles.imageTop}>
          <Image
            src={business}
            alt="Networking Event"
            width={400}
            height={240}
          />
        </div>
        <div className={styles.decorativeLine} />
      </div>
    </div>
  );
};

export default Businesses;
