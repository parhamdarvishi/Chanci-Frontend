"use client";
import React, { useEffect } from "react";
import EventHeader from "./Slice/eventHeader/eventHeader";
import UpComing from "./Slice/upcoming/UpComing";
import { Container } from "@mantine/core";
import Businesses from "./Slice/businesses/Businesses";
import Comments from "./Slice/comments/Comments";
import style from "./Slice/upcoming/UpComing.module.scss";
import EventSlider from "@/shared/ui/EventSlider/eventSlider";
import { Events, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";

const EventList = () => {
  const events = async () => {
      const reqBody = {
        Skip: 0,
        Take: 100,
      };
      const res: EventsResponse = await getRequest(
        eventAddresses.GetAll,
        reqBody,
        true
      );
      if (res?.isSuccess) {
        //updateData(res?.data?.items);cons
        console.log(res)
        console.log("+++++++++----------");
        return res.data?.items
      }
    };
      useEffect(() => {
        events();
      }, []);
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

        <EventSlider data={[]}/>

        <UpComing />
        <Businesses />
      </Container>
      <Comments />
    </div>
  );
};

export default EventList;
