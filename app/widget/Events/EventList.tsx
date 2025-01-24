import React from "react";
import EventHeader from "./Slice/eventHeader/eventHeader";
import UpComing from "./Slice/upcoming/UpComing";
import { Container } from "@mantine/core";
import Businesses from "./Slice/businesses/Businesses";
import Comments from "./Slice/comments/Comments";
import EventSlider from "@/shared/ui/EventSlider/eventSlider";

const EventList = () => {
  return (
    <div>
      <EventHeader />

      <Container>
        <EventSlider />
        <UpComing />
        <Businesses />
      </Container>
      <Comments />
    </div>
  );
};

export default EventList;
