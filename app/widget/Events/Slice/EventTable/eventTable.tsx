"use client";
import React from "react";
import { Event } from "@/shared/types/events/event";
import styles from "./EventTable.module.scss";
import Link from "next/link";

interface EventTableProps {
  events: Event[];
}

const EventTable: React.FC<EventTableProps> = ({ events }) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>All Events</h2>

      <ul className={styles.list}>
        {events.map((event) => (
          <li key={event.id} className={styles.listItem}>
            <div className={styles.eventInfo}>
  
              <span className={styles.titleText}><span className={styles.eventTitle}>Event Title :</span> {event.shortTitle}</span>

              <div className={styles.dateText}>
               <span className={styles.hostDate}>Host Date :</span> {event.hostDate
                  ? new Date(event.hostDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "TBA"}
              </div>
            </div>

   
            <Link href={`/panel/events/${event.id}`} className={styles.viewButton}>
              View Details
            </Link>
          </li>
        ))}
      </ul>

 
      <Link href="/panel/events/add" className={styles.floatingButton}>
        + New Event
      </Link>
    </div>
  );
};

export default EventTable;
