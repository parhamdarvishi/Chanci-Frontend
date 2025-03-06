"use client";
import { Card, Container } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./singleEvent.module.scss";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import calendar from "@public/image/icons/calendar.svg";
import clock from "@public/image/icons/clock.svg";
import header from "@public/image/events/singleEvents/poster.png";
import headerRes from "@public/image/events/singleEvents/eventRes.png";
import { Event, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";
import SingleEventHeader from "./Slice/SingleEventHeader/SingleEventHeader";
const SingleEvent : React.FC<{eventId : number}> = ({eventId}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [event, setEvent] = useState<Event>();
    const singleEventFetch = async () => {
      const reqBody = {
        Id: eventId,
        Skip: 0,
        Take: 1,
      };
      const res: EventsResponse = await getRequest(
        eventAddresses.GetbyId,
        reqBody,
        false
      );
      if (res?.isSuccess) {
        setEvent(res.data?.items[0]);
      }
      return [];
    };
  useEffect(() => {
    singleEventFetch();
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
    <div>
      <Container className={style.wrapper}>
        {/* <div className={style.header}>
          <h4 className={style.headerTitle}>Get Ready for Booking an Event</h4>
        </div> */}
        <Image
          className={style.headerImg}
          src={event?.bannerImagePath? ( isMobile ? headerRes : event.bannerImagePath) : header}
          alt={event?.shortTitle || "Image Event"}
        />
        <SingleEventHeader />
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.desc}
        >
          <h4>{event?.longTitle}</h4>
          <p>{event?.description}</p>
          <h6 className={style.cardExpect}> Panel of Speakers</h6>
          <ul>
            {event?.speakers.map((speaker, index)=> {
              return(
                <li key={index}>
                  <strong>{speaker.fullName}</strong>- {speaker.description}
                </li>
              )
            })}
          </ul>
          <div dangerouslySetInnerHTML={{ __html: event?.content || "" }} />
          <div className={style.cardIc}>
            <div className={style.cardPart}>
              <Image src={calendar} alt="calendar" className={style.image} />
              <p>Feb 15,2025</p>
            </div>
            <div className={style.cardPart}>
              <Image src={clock} alt="clock" className={style.image} />
              <p>{(event?.start && event?.end) && `${event.start}-${event.end}`}</p>
            </div>
          </div>
          <Link
            href={(event?.redirectUrl && event?.redirectUrl !== "empty") ? event?.redirectUrl : `/payment`}
            className={style.button}
          >
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
