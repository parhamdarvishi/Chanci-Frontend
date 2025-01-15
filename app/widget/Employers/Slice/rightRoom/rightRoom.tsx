"use client";
import React from "react";
import Image from "next/image";
import righRoom1 from "@public/image/file/righRoom.png";
import righRoom2 from "@public/image/file/righRoom2.png";
import event from "@public/image/icons/event.svg";
import eventBtn from "@public/image/icons/eventBtn.svg";
import ellipse from "@public/image/EllipseBg.svg";
import arrowR from "@public/image/icons/arrowR.svg";
import styles from "./rightRoom.module.scss";
import Link from "next/link";

const RightRoom = () => {
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
          <Image src={event} alt="event" width={140} height={54} />
          <h2>Step Into the Right Room</h2>
          <p>
            Discover NGN events designed for your goals, including professional
            networking, co-founder matching, and industry-focused gatherings.
            Become part of the NGN network to access exclusive offers and expand
            your company&apos;s opportunities.
          </p>
          <div style={{ cursor: "pointer", zIndex: "100" }}>
            <Link href="/Events">
              <Image src={eventBtn} alt="eventBtn" />
            </Link>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.imageTop}>
            <Image
              src={righRoom1}
              alt="Networking Event"
              width={400}
              height={240}
            />
          </div>
          <div className={styles.imageBottom}>
            <Image
              src={righRoom2}
              alt="Conference Event"
              width={400}
              height={240}
              className={styles.imageBtn}
            />
          </div>
        </div>
        <div className={styles.decorativeLine} />
      </div>
    </div>
  );
};

export default RightRoom;
