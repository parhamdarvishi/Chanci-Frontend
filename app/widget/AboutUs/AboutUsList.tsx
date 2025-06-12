"use client";
import React from "react";
import AboutUsHeader from "./Slice/aboutUsHeader/aboutUsHeader";
import { Box, Container, Divider, Grid } from "@mantine/core";
import style from "./Slice/aboutUsHeader/aboutusHeader.module.scss";
import Image from "next/image";
import check from "@public/image/widget/aboutUs/check.svg";
import value1 from "@public/image/widget/aboutUs/icons/value1.svg";
import value2 from "@public/image/widget/aboutUs/icons/value2.svg";
import value3 from "@public/image/widget/aboutUs/icons/value3.svg";
import value4 from "@public/image/widget/aboutUs/icons/value4.svg";
import value5 from "@public/image/widget/aboutUs/icons/value5.svg";
import value6 from "@public/image/widget/aboutUs/icons/value6.svg";
import value7 from "@public/image/widget/aboutUs/icons/value7.svg";
import Link from "next/link";
import { modals } from "@mantine/modals";
import ModalTouch from "@/shared/ui/ModalTouch/modalTouch";
import TextAlign from "@tiptap/extension-text-align";

const AboutUsList = () => {
  
  const openModal = () =>
    modals.open({
      radius: "lg",
      size: "lg",
      title: <strong className={style.modalTitle}>Get in touch</strong>,
      children: <ModalTouch />,
    });
  return (
    <div>
      <AboutUsHeader />
      <Container>
        <div className={style.aboutDesc}>
          <h1 style={{fontWeight: "300"}}>
            <span
                style={{borderBottom: "4px solid #5e62fc", borderRadius: "4px"}}
            >
              A
            </span>
            bout New Generation Network
          </h1>
          <p style={{
            textAlign: "justify"
          }}>
            A tech company with a focus on developing AI solutions for the future of work, founded by Jasmine Sayyari,
            the CEO, in 2024 and headquartered in London. As AI advancements influence every aspect of human life, the
            future of work is not safe too. New Generation Network is on a mission to deliver Chanci AI, a
            conversational career platform that enables users to get access to hidden opportunities in the job market
            and reskill and upskill faster.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            The company’s flagship product is a conversational career platform working with real-time job market data
            and introduces a new currency for the future of work: the Employability Score, making job market readiness a
            more tangible factor. The goal is to give the power of AI into the hands of companies and candidates,
            reducing the confusion around jobs andthe future with AI.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            New Generation Network is a group of young experts in business, machine learning, and product management,
            and is proud of building its unique community of tech by hosting events and panels, inviting smart,
            talented, and diverse founders to get together and share their ideas.
          </p>
          <h1 style={{fontWeight: "300"}}>
            <span
                style={{borderBottom: "4px solid #5e62fc", borderRadius: "4px"}}
            >
              A
            </span>
            bout the Founder
          </h1>
          <p style={{
            textAlign: "justify"
          }}>
            Winner of the InspiringFifty UK 2025 award, Jasmine Sayyari is a doctor-turned-entrepreneur empowering Gen Z
            through tech. After leading during the COVID crisis, she founded multiple startups and now runs New
            Generation Network, a UK-based tech company developing AI solutions for the future of work, helping young
            people upskill and navigate career shifts.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            She holds dual degrees in business and medicine, with a strong background in business development and talent
            acquisition. A passionate voice for inclusion and innovation, she’s proving you don’t need to code to lead
            in tech.
          </p>
          <h1 style={{fontWeight: "300"}}>
            <span
                style={{borderBottom: "4px solid #5e62fc", borderRadius: "4px"}}
            >
              A
            </span>
            bout Chanci AI
          </h1>
          <p style={{
            textAlign: "justify"
          }}>
            Chanci AI is a brand-new career platform that introduces the Employability Score as a new currency for job
            market readiness. This tangible measure helps candidates understand where they stand. What makes their
            approach unique is the combination of psychology-based assessments, skills analysis, visa status/nationality
            insights, and real-time job market data tailored to the country users are targeting.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            This unlocks hidden job opportunities and attracts top talent by matching them with roles that are the right
            fit. Compared to traditional career platforms with so many fake job postings and nowhere to improve or truly
            get assessed, Chanci is available to meet the needs of job seekers, from freshly graduated college students
            to laid-off experienced employees who lost their jobs because of AI advancement!
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            Over the next five years, an estimated 170 million new jobs will be introduced globally, while 92 million
            will disappear. As this shift unfolds, both employers and graduates are under pressure to adapt quickly.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            Chanci AI is a Gen Z-friendly, conversational platform designed to help candidates reskill and upskill fast
            through personalised progress plans based on their unique profile.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            This actionable guide enables candidates to work on their Employability Score and increase it over time,
            which means higher chances in the job market and a stronger profile that stands out.
          </p>
          <p style={{
            textAlign: "justify"
          }}>
            The Chanci AI Beta version has launched for the first phase.
          </p>
        </div>
      </Container>
      {/*<Box className={style.aboutAreas}>*/}
      {/*  <Container className={style.container}>*/}
      {/*    <h2>Focus Areas</h2>*/}
      {/*    <div className={style.areaBox}>*/}
      {/*      <div*/}
      {/*          style={{display: "flex", gap: ".5rem", alignItems: "center"}}*/}
      {/*      >*/}
      {/*      <Image src={check} alt="check"/>*/}
      {/*        <h3>Gen Z Empowerment</h3>*/}
      {/*      </div>*/}
      {/*      <p>*/}
      {/*        By 2030, Gen Z is set to become a major part of the global*/}
      {/*        workforce. Yet, challenges like outdated corporate practices and*/}
      {/*        academic resistance to AI still persist. We aim to change this.*/}
      {/*        Through Chanci AI, our Ambassador Programme, NGN Academy, and*/}
      {/*        networking events, we offer young talent in the UK the tools and*/}
      {/*        community to thrive.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className={style.areaBox}>*/}
      {/*      <div*/}
      {/*        style={{ display: "flex", gap: ".5rem", alignItems: "center" }}*/}
      {/*      >*/}
      {/*        <Image src={check} alt="check" />*/}
      {/*        <h3>Employer Rebranding</h3>*/}
      {/*      </div>*/}
      {/*      <p>*/}
      {/*        By 2030, Gen Z is set to become a major part of the global*/}
      {/*        workforce. Yet, challenges like outdated corporate practices and*/}
      {/*        academic resistance to AI still persist. We aim to change this.*/}
      {/*        Through Chanci AI, our Ambassador Programme, NGN Academy, and*/}
      {/*        networking events, we offer young talent in the UK the tools and*/}
      {/*        community to thrive.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*    <div className={style.areaBox}>*/}
      {/*      <div*/}
      {/*        style={{ display: "flex", gap: ".5rem", alignItems: "center" }}*/}
      {/*      >*/}
      {/*        <Image src={check} alt="check" />*/}
      {/*        <h3>Promoting Diversity</h3>*/}
      {/*      </div>*/}
      {/*      <p>*/}
      {/*        As a diverse team ourselves, we know the value that inclusivity*/}
      {/*        brings. We are committed to increasing opportunities for minority*/}
      {/*        groups and Black heritage communities in the job market.*/}
      {/*        Additionally, we provide tailored services for the neurodivergent*/}
      {/*        community, ensuring everyone has a chance to succeed.*/}
      {/*      </p>*/}
      {/*    </div>*/}
      {/*  </Container>*/}
      {/*</Box>*/}
      <Container>
        <div className={style.ourValue}>
          {/*<h1 style={{ fontWeight: "300" }}>*/}
          {/*  <span*/}
          {/*    style={{ borderBottom: "4px solid #5e62fc", borderRadius: "4px" }}*/}
          {/*  >*/}
          {/*    O*/}
          {/*  </span>*/}
          {/*  ur*/}
          {/*  <strong> Values</strong>*/}
          {/*</h1>*/}
          {/*<Grid className={style.ourGrid}>*/}
          {/*  <Grid.Col span={{ base: 12, md: 4 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value1} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>Focusing on student-first services</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*  <Grid.Col span={{ base: 12, md: 4 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value2} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>Bridging the gap between education and industry</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*  <Grid.Col span={{ base: 12, md: 4 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value3} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>Empowering women in leadership roles</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*</Grid>*/}
          {/*<Grid className={style.ourGrid}>*/}
          {/*  <Grid.Col span={{ base: 12, md: 3 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value4} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>Promoting inclusivity and diversity</p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*  <Grid.Col span={{ base: 12, md: 3 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value5} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>*/}
          {/*          Reducing job search time and making career coaching*/}
          {/*          accessible for all*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*  <Grid.Col span={{ base: 12, md: 3 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value6} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>*/}
          {/*          Helping companies embrace Gen Z culture and rebrand*/}
          {/*          effectively*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*  <Grid.Col span={{ base: 12, md: 3 }}>*/}
          {/*    <div className={style.ourValueCard}>*/}
          {/*      <div>*/}
          {/*        <div className={style.valueHeader}>*/}
          {/*          <Image src={value7} alt="icon" width={58} height={58} />*/}
          {/*        </div>*/}
          {/*        <Divider color="#ececec" />*/}
          {/*        <p>*/}
          {/*          Using AI to balance the power between candidates and*/}
          {/*          companies*/}
          {/*        </p>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*  </Grid.Col>*/}
          {/*</Grid>*/}
          <Box className={style.mission}>
            {/*<h1 style={{ fontWeight: "300", textAlign: "center" }}>*/}
            {/*  <span*/}
            {/*    style={{*/}
            {/*      borderBottom: "4px solid #5e62fc",*/}
            {/*      borderRadius: "4px",*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    O*/}
            {/*  </span>*/}
            {/*  ur*/}
            {/*  <strong> Mission</strong>*/}
            {/*</h1>*/}
            {/*<p>*/}
            {/*  We use AI to support Gen Z in the UK job market and beyond. Our*/}
            {/*  mission is to build a network that values people as individuals,*/}
            {/*  not just users, empowering them to achieve their career goals.*/}
            {/*</p>*/}
            <div className={style.missionBtn}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "0rem",
                  paddingBottom: "2rem",
                }}
              >
                <div
                  onClick={openModal}
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    height: "60px",
                    fontSize: "20px",
                    fontWeight: "400",
                  }}
                >
                  Get in touch with Us
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
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "0rem",
                  paddingBottom: "2rem",
                }}
              >
                <Link
                  href="/Candidates"
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    height: "60px",
                    fontSize: "20px",
                    fontWeight: "400",
                  }}
                >
                  Services for Students
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  paddingTop: "0rem",
                  paddingBottom: "2rem",
                }}
              >
                <Link
                  href="/Employers"
                  className={style.button}
                  style={{
                    borderRadius: "16px",
                    height: "60px",
                    fontSize: "20px",
                    fontWeight: "400",
                  }}
                >
                  Services for companies
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
          </Box>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsList;
