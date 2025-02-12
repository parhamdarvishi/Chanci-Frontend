"use client";
import { Box, Container } from "@mantine/core";
import { blogs } from "@shared/data/blog";
import React from "react";
import style from "./style.module.scss";
import Image from "next/image";
import bookIc from "@public/image/icons/book.svg";
import calendar from "@public/image/icons/calendar.svg";
import tickCircle from "@public/image/icons/tickCircle.svg";

type props = {
  id: number;
};

const SingleBlogList = ({ id }: props) => {
  const blog = blogs[id - 1];

  return (
    <Container className={style.wrapper}>
      {/* <Image src={blog?.imageUrl} className={style.header} alt="blog" /> */}
      <Box
        className={style.header}
        style={{
          background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.10), rgba(0, 0, 0, 0.4)), url(${blog?.imageUrl.src})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <strong>{blog?.title}</strong>
      </Box>
      <Box>
        <Box className={style.detailDate}>
          <div className={style.detailPart}>
            <Image src={calendar} alt="calendar" />
            <p style={{ color: "#878787", fontSize: "18px" }}>{blog?.date}</p>
          </div>
          <div className={style.detailPart}>
            <Image src={bookIc} alt="book" />
            <p style={{ color: "#878787", fontSize: "18px" }}>
              {blog?.time} Min
            </p>
          </div>
        </Box>
        <Box className={style.descBox}>
          <p>{blog?.desc}</p>
        </Box>
        <Box className={style.item}>
          {blog?.parts.map((item) => (
            <Box key={item?.id}>
              <div className={style.titleBox}>
                <Image src={tickCircle} alt="check" width={24} />
                <strong>{item?.title}</strong>
              </div>
              <div className={style.descBox}>
                <p>{item?.desc}</p>
              </div>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default SingleBlogList;
