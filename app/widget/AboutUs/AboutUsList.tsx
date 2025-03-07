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
          <h1 style={{ fontWeight: "300" }}>
            <span
              style={{ borderBottom: "4px solid #5e62fc", borderRadius: "4px" }}
            >
              A
            </span>
            bout our
            <strong> Team</strong>
          </h1>
          <p>
            Imagine the power of humans and technology coming together as a
            team. That&apos;s who we are. NGN is a group of young experts in
            business, machine learning, and product management. We focus on
            helping top talents choose the best career path with the latest job
            market insights while supporting companies to enhance their employer
            brand and attract the right talent.
          </p>
          <p>
            Founded in 2024 by Jasmine Sayyari, NGN developed Chanci AI, the
            ultimate AI career coach. Chanci AI empowers individuals to succeed
            in their job search by offering personalised psychology tests and
            skill assessments. It creates a unique employability score across
            over 20 industries for each user, matches them with suitable job
            opportunities, and provides step-by-step guidance to improve their
            skills. Backed by machine learning and innovative algorithms, Chanci
            AI uses up-to-date job market data maintained by our skilled
            engineers and data scientists.
          </p>
        </div>
      </Container>
      <Box className={style.aboutAreas}>
        <Container className={style.container}>
          <h2>Focus Areas</h2>
          <div className={style.areaBox}>
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <Image src={check} alt="check" />
              <h3>Gen Z Empowerment</h3>
            </div>
            <p>
              By 2030, Gen Z is set to become a major part of the global
              workforce. Yet, challenges like outdated corporate practices and
              academic resistance to AI still persist. We aim to change this.
              Through Chanci AI, our Ambassador Programme, NGN Academy, and
              networking events, we offer young talent in the UK the tools and
              community to thrive.
            </p>
          </div>
          <div className={style.areaBox}>
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <Image src={check} alt="check" />
              <h3>Employer Rebranding</h3>
            </div>
            <p>
              By 2030, Gen Z is set to become a major part of the global
              workforce. Yet, challenges like outdated corporate practices and
              academic resistance to AI still persist. We aim to change this.
              Through Chanci AI, our Ambassador Programme, NGN Academy, and
              networking events, we offer young talent in the UK the tools and
              community to thrive.
            </p>
          </div>
          <div className={style.areaBox}>
            <div
              style={{ display: "flex", gap: ".5rem", alignItems: "center" }}
            >
              <Image src={check} alt="check" />
              <h3>Promoting Diversity</h3>
            </div>
            <p>
              As a diverse team ourselves, we know the value that inclusivity
              brings. We are committed to increasing opportunities for minority
              groups and Black heritage communities in the job market.
              Additionally, we provide tailored services for the neurodivergent
              community, ensuring everyone has a chance to succeed.
            </p>
          </div>
        </Container>
      </Box>
      <Container>
        <div className={style.ourValue}>
          <h1 style={{ fontWeight: "300" }}>
            <span
              style={{ borderBottom: "4px solid #5e62fc", borderRadius: "4px" }}
            >
              O
            </span>
            ur
            <strong> Values</strong>
          </h1>
          <Grid className={style.ourGrid}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value1} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>Focusing on student-first services</p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value2} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>Bridging the gap between education and industry</p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value3} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>Empowering women in leadership roles</p>
                </div>
              </div>
            </Grid.Col>
          </Grid>
          <Grid className={style.ourGrid}>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value4} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>Promoting inclusivity and diversity</p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value5} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>
                    Reducing job search time and making career coaching
                    accessible for all
                  </p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value6} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>
                    Helping companies embrace Gen Z culture and rebrand
                    effectively
                  </p>
                </div>
              </div>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3 }}>
              <div className={style.ourValueCard}>
                <div>
                  <div className={style.valueHeader}>
                    <Image src={value7} alt="icon" width={58} height={58} />
                  </div>
                  <Divider color="#ececec" />
                  <p>
                    Using AI to balance the power between candidates and
                    companies
                  </p>
                </div>
              </div>
            </Grid.Col>
          </Grid>
          <Box className={style.mission}>
            <h1 style={{ fontWeight: "300", textAlign: "center" }}>
              <span
                style={{
                  borderBottom: "4px solid #5e62fc",
                  borderRadius: "4px",
                }}
              >
                O
              </span>
              ur
              <strong> Mission</strong>
            </h1>
            <p>
              We use AI to support Gen Z in the UK job market and beyond. Our
              mission is to build a network that values people as individuals,
              not just users, empowering them to achieve their career goals.
            </p>
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
                  href="/Condidates"
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
                  href="/Condidates"
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
