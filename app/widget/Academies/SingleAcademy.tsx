"use client";
import { Card, Container, Skeleton } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./singleEvent.module.scss";
import Link from "next/link";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import headerRes from "@public/image/events/singleEvents/eventRes.png";
import { getRequest } from "@/shared/api";
import {bootcamp, BootcampResponse} from "@shared/types/bootcamp/bootcamp";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";
const SingleAcademy: React.FC<{ bootcampId: number }> = ({ bootcampId }) => {
  
  const [isMobile, setIsMobile] = useState(false);
  const [bootcamp, setBootcamp] = useState<bootcamp>();
  const singleBootcampFetch = async () => {
    const reqBody = {
      Id: bootcampId,
      Skip: 0,
      Take: 1,
    };
    const res: BootcampResponse = await getRequest(
      bootcampAddress.GetById,
      reqBody,
      false
    );
    debugger;
    if (res?.isSuccess && Array.isArray(res.data?.items) && res.data.items.length > 0) {
      setBootcamp(res.data?.items[0]);
    }
    return [];
  };
  useEffect(() => {

    singleBootcampFetch();
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []); 
  return (
    <div>
      <Container className={style.wrapper}>
        {bootcamp ?
          <Image
            className={style.headerImg}
            src={isMobile ? (bootcamp.mobileImagePath? bootcamp.mobileImagePath : headerRes) : 
                bootcamp.bannerImagePath as string}
            width={0}
            height={0}
            style={{ width: '100%', height: 'auto' }}
            unoptimized
            alt={bootcamp?.title || "Image Event"}
          /> : <Skeleton height={400} radius="md" width="full" />}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.desc}
        >
          <div dangerouslySetInnerHTML={{ __html: bootcamp?.description || "" }} />
          <Link
              href={`/BootcampPayment?bootcampId=${bootcampId}` }
              className={style.button}
          >
            Enroll
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

export default SingleAcademy;
