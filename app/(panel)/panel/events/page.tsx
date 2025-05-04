"use client";
import React, { useEffect, useState } from "react";
import { Container, Loader } from "@mantine/core";
import EventTable from "@/widget/Events/Slice/EventTable/eventTable";
import { Event, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";

const EventsPage = () => {
  const [events, setEvents] = useState<Event[]>([]);


  const fetchEvents = async () => {
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
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      {events.length > 0 ? (
        <EventTable events={events} />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Loader size={80} />
        </div>
      )}
    </>
  );
};

export default EventsPage;
