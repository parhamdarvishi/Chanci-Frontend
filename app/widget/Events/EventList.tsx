import React from "react";
import EventHeader from "./Slice/eventHeader/eventHeader";
import UpComing from "./Slice/upcoming/UpComing";
import { Container } from "@mantine/core";
import Businesses from "./Slice/businesses/Businesses";
import Comments from "./Slice/comments/Comments";
import EventSlider from "@/shared/ui/EventSlider/eventSlider";
import style from "./Slice/upcoming/UpComing.module.scss";

const EventList = () => {
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

        {/* <EventSlider /> */}

        <UpComing />
        <Businesses />
      </Container>
      <Comments />
    </div>
  );
};

export default EventList;
