"use client";
import React, { useEffect, useState } from "react";
import EventHeader from "./Slice/eventHeader/eventHeader";
import { Container, Loader } from "@mantine/core";
import Businesses from "./Slice/businesses/Businesses";
import Comments from "./Slice/comments/Comments";
import style from "./Slice/upcoming/UpComing.module.scss";
import EventSlider from "@/shared/ui/EventSlider/eventSlider";
import { Event, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const allevents = async () => {
    const reqBody = {
      "Sorts[0].PropertyName": "id",
      "Sorts[0].isAscending": false,
      Skip: 0,
      Take: 100,
    };
    const res: EventsResponse = await getRequest(
      eventAddresses.GetAll,
      reqBody,
      false
    );
    if (res?.isSuccess) {
      setEvents(res.data?.items ?? []);
    }
    return [];
  };
  useEffect(() => {
    allevents();
  }, [])
  return (
    <div>
      <EventHeader />

      <Container>
        <div className={style.upcomingHeader}>
          <h1 style={{ fontWeight: "300" }}>
            <strong
              style={{ borderBottom: "4px solid #5e62fc", borderRadius: "4px" }}
            >
              U
            </strong>
            <strong>pcoming</strong>

            <span> Events</span>
          </h1>
        </div>
        {events.length > 0 ? <EventSlider data={events.filter((e) => e.isShowable)} /> : <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}><Loader size={80} /> </div>}
        <Businesses />
      </Container>
      <Comments />
    </div>
  );
};

export default EventList;
