"use client";
import { Container } from "@mantine/core";
import React from "react";
import errorImage from "@public/image/404Error.svg";
import Image from "next/image";
import style from "./(pages)/ComingSoon/comingSoon.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  const redirectHome = () => {
    router.push("/Home");
  };
  return (
    <>
      <NavbarMain />
      <Container className={style.container}>
        <Image src={errorImage} width={500} height={460} alt="404Error" loading="lazy" />
        <p>
          <strong>Unfortunately, no page was found.</strong>
        </p>
        <div
          className={style.button}
          style={{
            borderRadius: "16px",
            height: "60px",
            fontSize: "20px",
            fontWeight: "400",
            cursor: "pointer"
          }}
          onClick={redirectHome}
        >
          Back to Home Page
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
      </Container>
    </>
  );
};

export default NotFound;