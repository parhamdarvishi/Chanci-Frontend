"use client";
import { Card, Container, Skeleton, Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./eventDetails.module.scss";
import Image from "next/image";
import calendar from "@public/image/icons/calendar.svg";
import clock from "@public/image/icons/clock.svg";
import headerRes from "@public/image/events/singleEvents/eventRes.png";
import { Event, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";
import { formatDate } from "@/shared/helpers/util";

const EventDetails: React.FC<{ eventId: any }> = ({ eventId }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [event, setEvent] = useState<Event>();

  const fetchEventDetails = async () => {
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
  };

  useEffect(() => {
    fetchEventDetails();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleGoBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <div>
      <Container className={style.wrapper}>
        <Button onClick={handleGoBack} className={style.goBackBtn}>
            X <span className={style.goBackText}>Go Back</span>
        </Button>

        {event ? (
          <Image
            className={style.headerImg}
            src={
              isMobile
                ? event.mobileImagePath || headerRes
                : (event.bannerImagePath as string)
            }
            width={0}
            height={0}
            style={{ width: "100%", height: "auto" }}
            unoptimized
            alt={event?.shortTitle || "Event Image"}
          />
        ) : (
          <Skeleton height={400} radius="md" width="full" />
        )}

        {event && (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.desc}
          >
            <h4>{event.longTitle}</h4>
            <p>{event.description}</p>

            {event.speakers && event.speakers.length > 0 && (
              <>
                <h6 className={style.cardExpect}>Panel of Speakers</h6>
                <ul>
                  {event.speakers.map((speaker, index) => (
                    <li key={index}>
                      <strong>{speaker.fullName}</strong> -{" "}
                      {speaker.description}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div dangerouslySetInnerHTML={{ __html: event?.content || "" }} />

            <div className={style.cardIc}>
              <div className={style.cardPart}>
                <Image src={calendar} alt="calendar" className={style.image} />
                <p>{event?.hostDate && formatDate(event.hostDate)}</p>
              </div>
              <div className={style.cardPart}>
                <Image src={clock} alt="clock" className={style.image} />
                <p>
                  {event?.start &&
                    event?.end &&
                    `${event.start} - ${event.end}`}
                </p>
              </div>
            </div>
          </Card>
        )}
      </Container>
    </div>
  );
};

export default EventDetails;
