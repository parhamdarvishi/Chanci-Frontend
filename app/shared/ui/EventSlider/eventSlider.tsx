"use client";
import React, { useEffect, useRef, useState , FC } from "react";
import Image from "next/image";
import style from "./eventSlider.module.scss";
import img1 from "@public/image/events/cardImg.png"; // Replace with your actual image paths
import calendar from "@public/image/icons/calendar.svg";
import clock from "@public/image/icons/clock.svg";
import Link from "next/link";
import { sliderData } from "./data";
import { Events } from "@/shared/types/events/event";

const EventSlider : React.FC<Events > = ({data=sliderData}) => {
  const [isMobile, setIsMobile] = useState(false);
  console.log(data)
  useEffect(() => {
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2; // Adjust scroll speed
    sliderRef.current!.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className={style.sliderContainer}>
      <div
        className={style.slider}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {data.map((event, index) => {
          return(
            <div key={index} className={style.card}>
            <Image src={img1} alt="Event 1" className={style.imgCard} />
            <div className={style.desc}>
              <h3>{event?.longTitle}</h3>
              <p>
                {isMobile
                  ? "An exclusive event featuring top founders ..."
                  : event?.description}
              </p>
              <div className={style.cardIc}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={calendar} alt="calendar" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    Feb 15,2025
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={clock} alt="clock" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    12:00-15:00
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "0rem",
                  paddingBottom: ".5rem",
                }}
              >
                <Link
                  href={`/Events/${event?.id}`}
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    fontSize: "16px",
                    height: "46px",
                    fontWeight: "400",
                  }}
                >
                  {isMobile ? "Register" : "Register the Event"}
  
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )
        })}
        
          {/* <div className={style.card}>
            <Image src={img1} alt="Event 1" className={style.imgCard} />
            <div className={style.desc}>
              <h3>Next Event</h3>
              <p>
                From exclusive private events to dynamic job fairs, creative
                co-founder matchmaking
              </p>
              <div className={style.cardIc}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={calendar} alt="calendar" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    Jan 22,2025
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={clock} alt="clock" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    16:00-18:00
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "0rem",
                  paddingBottom: ".5rem",
                }}
              >
                <Link
                  href="/find-talent"
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    fontSize: "16px",
                    height: "46px",
                    fontWeight: "400",
                  }}
                >
                  {isMobile ? "Register" : "Register the Event"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className={style.card}>
            <Image src={img1} alt="Event 1" className={style.imgCard} />
            <div className={style.desc}>
              <h3>Next Event</h3>
              <p>
                From exclusive private events to dynamic job fairs, creative
                co-founder matchmaking
              </p>
              <div className={style.cardIc}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={calendar} alt="calendar" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    Jan 13,2025
                  </p>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: ".3rem" }}
                >
                  <Image src={clock} alt="clock" />
                  <p style={{ color: "#878787", fontSize: "14px" }}>
                    16:00-18:00
                  </p>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  paddingTop: "0rem",
                  paddingBottom: ".5rem",
                }}
              >
                <Link
                  href="/find-talent"
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    fontSize: "16px",
                    height: "46px",
                    fontWeight: "400",
                  }}
                >
                  {isMobile ? "Register" : "Register the Event"}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div> */}
        </div>
        {/* <button
          className={styles.scrollButton}
          onClick={() => handleScroll("right")}
        >
          &gt;
        </button> */}
    </div>
  );
};

export default EventSlider;
