"use client";
import { Box, Card, Input } from "@mantine/core";
import style from "./payment.module.scss";
import React from "react";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";

const Payment = () => {
  return (
    <>
      <NavbarMain />
      <div className={style.paymentWrapper}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.paymentCard}
        >
          <p>
            Please enter your full name and email address and click the button
            to proceed with your payment and complete the booking process for
            participating in the event.
          </p>
          <Box>
            <Input.Wrapper
              classNames={{
                root: style.root,
                label: style.label,
                description: style.description,
              }}
              withAsterisk
              label="Full name"
              description="Please enter your full name"
            >
              <Input classNames={{ input: style.input }} />
            </Input.Wrapper>
          </Box>
          <Box>
            <Input.Wrapper
              classNames={{
                root: style.root,
                label: style.label,
                description: style.description,
              }}
              withAsterisk
              label="Email"
              description="Please enter your email"
            >
              <Input
                classNames={{ input: style.input }}
                placeholder="For e.g. example@gmail.com"
              />
            </Input.Wrapper>
          </Box>
          <Link href="#" className={style.button}>
            Pay Now
            <Image
              className={style.cardArrow}
              src={arrowRight}
              alt="arrowRight"
              width={22}
            />
          </Link>
        </Card>
      </div>
    </>
  );
};

export default Payment;
