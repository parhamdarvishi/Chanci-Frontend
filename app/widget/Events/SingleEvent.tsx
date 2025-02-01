import { Card, Container } from "@mantine/core";
import React from "react";
import style from "./singleEvent.module.scss";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import calendar from "@public/image/icons/calendar.svg";
import clock from "@public/image/icons/clock.svg";

const SingleEvent = () => {
  return (
    <div>
      <Container className={style.wrapper}>
        <div className={style.header}>
          <h4 className={style.headerTitle}>Get Ready for Booking an Event</h4>
        </div>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.desc}
        >
          <h4>
            <strong>We host, </strong>
            we create connections, and we nurture collaboration!
          </h4>
          <p>
            We focus on inclusivity, accessibility, creativity, and culture,
            ensuring every event offers an opportunity to grow and thrive. No
            matter your skills, the network you’re part of will shape your
            future. We level up your capabilities and share our exceptional
            network of professionals with you to unlock new possibilities.
          </p>
          <div className={style.cardIc}>
            <div className={style.cardPart}>
              <Image src={calendar} alt="calendar" className={style.image} />
              <p>Jan 13,2025</p>
            </div>
            <div className={style.cardPart}>
              <Image src={clock} alt="clock" className={style.image} />
              <p>16:00-18:00</p>
            </div>
          </div>
          <Link href="#" className={style.button}>
            Get a ticket
            <Image
              className={style.cardArrow}
              src={arrowRight}
              alt="arrowRight"
              width={22}
            />
          </Link>
        </Card>
      </Container>
    </div>
  );
};

export default SingleEvent;
