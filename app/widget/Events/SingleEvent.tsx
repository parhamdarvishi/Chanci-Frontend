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

const SingleEvent = () => {
  const [isMobile, setIsMobile] = useState(false);

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
  return (
    <div>
      <Container className={style.wrapper}>
        {/* <div className={style.header}>
          <h4 className={style.headerTitle}>Get Ready for Booking an Event</h4>
        </div> */}
        <Image
          className={style.headerImg}
          src={isMobile ? headerRes : header}
          alt="sdsd"
        />
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.desc}
        >
          <h4>
            {/* <strong>We host, </strong> */}
            {/* we create connections, and we nurture collaboration! */}
            Learn and Network with London&apos;s Top Founders: Branding,
            Storytelling & Fundraising
          </h4>
          <p>
            {/* We focus on inclusivity, accessibility, creativity, and culture,
            ensuring every event offers an opportunity to grow and thrive. No
            matter your skills, the network you’re part of will shape your
            future. We level up your capabilities and share our exceptional
            network of professionals with you to unlock new possibilities. */}
            An exclusive event featuring top founders and investors who know
            exactly what it takes to succeed in the startup ecosystem. Join a
            handpicked selection of professionals and distinguished guests in a
            dynamic and inspiring setting. Expect award-winning speakers,
            insightful discussions, and an experienced team of co-hosts ready to
            facilitate meaningful connections. Looking for partners, investors,
            or a breakthrough opportunity? This is the place to make it happen.
            With limited invitations available, secure your spot now before they
            disappear! About the Organisers New Generation Network is a
            pioneering tech startup and community, collaborating with Oasis
            London, a venture under Blue Lake VC. Founded by Lyubov Guk and
            David Gilgur, Blue Lake VC is committed to backing international
            founders and fostering diversity within the UK startup ecosystem.
          </p>
          {/* <h5 className={style.cardExpect}> What to Expect</h5> */}
          <h6 className={style.cardExpect}> Panel of Speakers</h6>
          <ul>
            <li>
              <strong>Jasmine Sayyari</strong>– A four-time founder and the CEO
              of New Generation Network, a London-based tech startup helping Gen
              Z navigate the fast-changing job market with AI tools. With a
              strong background in business development management, she has
              experience leading both tech and non-tech teams with diverse
              backgrounds. Holding dual degrees in business and medicine, she is
              an advocate for career switching and community building.
            </li>
            <li>
              <strong>Zareen Ali</strong> – CEO and co-founder of Cogs, a
              startup transforming healthcare for the neurodivergent community.
              Her journey began in 2017 while juggling her role as a product
              manager for an AI medtech startup with volunteering and mentoring
              neurodivergent children. Frustrated by systemic gaps, she launched
              Cog AI, a pioneering platform now featured in the Startups 100
              Index for 2025, a prestigious ranking that has previously
              highlighted high-growth disruptors such as Monzo, Deliveroo, and
              HelloFresh.
            </li>
            <li>
              <strong>Ahana Banerjee</strong> – Founder of Clear and a Forbes 30
              Under 30 Technology Honouree, Ahana Banerjee is an industry leader
              revolutionising skincare through technology. She was also featured
              on the Sunday Times Young Power List 2024. Her startup, Clear (YC
              W21), is a free mobile app offering personalised, data-driven
              skincare recommendations. Recently, she secured £1 million in seed
              funding, further accelerating Clear’s growth and impact.
            </li>
            <li>
              <strong>Theresa Dellagiacoma-Fitz</strong> – Panel Moderator. With
              a strong background in people management, marketing, and
              innovation, Theresa has guided numerous startups in scaling their
              operations. She has worked with both tech and non-tech
              international startups, leading strategic sales initiatives and
              fostering business growth.
            </li>
          </ul>
          <h6 className={style.cardExpect}> Fast & Smart Networking</h6>
          <p>
            This event features a unique, structured networking format. With
            assistance from co-hosts, attendees will have the opportunity to
            introduce themselves, move around the room, and connect with
            co-founders, investors, or potential employers/employees.
          </p>
          <h6 className={style.cardExpect}>Important Information</h6>
          <ul>
            <li>
              <strong>Event Reminders : </strong>
              You will receive reminder emails a day before and on the day of
              the event, including the event location.
            </li>
            <li>
              <strong>Photography & Media : </strong>
              Photos and videos may be taken during the event for promotional
              purposes on New Generation Network Ltd’s website and social media.
              By attending, you consent to your image being used.
            </li>
            <li>
              <strong>LinkedIn QR Code : </strong>
              Bring your LinkedIn profile QR code for smarter networking.
            </li>
            <li>
              <strong>Refund Policy : </strong>
              Ticket refunds are available up to seven days before the event. No
              refunds will be issued for cancellations after this period.
            </li>
            <li>
              <strong>Accessibility : </strong>
              If you require any reasonable adjustments, please contact us by
              responding to this email, and we will do our best to accommodate
              your needs.
            </li>
          </ul>

          <div className={style.cardIc}>
            <div className={style.cardPart}>
              <Image src={calendar} alt="calendar" className={style.image} />
              <p>Feb 15,2025</p>
            </div>
            <div className={style.cardPart}>
              <Image src={clock} alt="clock" className={style.image} />
              <p>12:00-15:00</p>
            </div>
          </div>
          <Link
            href="https://www.eventbrite.co.uk/e/learn-and-network-with-londons-top-founders-branding-storytelling-fund-tickets-1225368844199 "
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
