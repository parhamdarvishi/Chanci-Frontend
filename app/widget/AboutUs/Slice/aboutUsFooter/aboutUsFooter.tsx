import { SlideData } from "@/widget/Candidates/model";
import { Box, Container, Grid, GridCol } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import empBlogGenZ from "@public/image/blog/empBlogGenZ.png";
import empBlogDei from "@public/image/blog/empBlogDei.png";
import empBlogSolve from "@public/image/blog/empBlogSolve.png";
import arrowSlide from "@public/image/icons/arrowSlide.svg";
import style from "./aboutUsFooter.module.scss";

const AboutUsFooter = () => {
  const slides: SlideData[] = [
    {
      id: 4,
      title: "Gen Z at Work: 8 Changes Your Company Can’t Ignore",
      description:
        "Generation Z, born between the mid-1990s and early 2010s, now represents nearly a third of the global workforce...",
      image: empBlogGenZ,
    },
    {
      id: 5,
      title:
        "The Role of Automation in Solving the UK’s 1.3 Million Job Market Gap",
      description:
        "The UK job market is facing a major challenge, with over 1.3 million job ... ",
      image: empBlogSolve,
    },
    {
      id: 6,
      title: "The Current State of DEI in the UK",
      description:
        "Recent surveys show a noticeable shift in how UK businesses view DEI. A 2023 report found that 57% of companies ...",
      image: empBlogDei,
    },
  ];
  const sliderR = slides.filter((item, index) => index !== 0);
  return (
    <Container>
      <Grid style={{ minHeight: "660px" }}>
        <GridCol span={6}>
          <Box>
            <Link
              href={`/blog/${slides[0]?.id}`}
              key={slides[0]?.id}
              className={style.card}
              //   style={{ width: `${cardWidth}px` }}
            >
              <div className={style.imageWrapper}>
                <Image
                  src={slides[0]?.image}
                  alt={slides[0]?.title}
                  width={400}
                  height={300}
                  className={style.image}
                />
              </div>
              {slides[0].title && (
                <div className={style.content}>
                  <h3>{slides[0].title}</h3>
                  <p>{slides[0].description}</p>
                  <Link
                    href={`/blog/${slides[0]?.id}`}
                    className={style.readMore}
                    style={{ display: "flex" }}
                  >
                    {" "}
                    Read More
                    <Image src={arrowSlide} alt="arrowSlide" />
                  </Link>
                </div>
              )}
            </Link>
          </Box>
        </GridCol>
        <GridCol span={6}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}
          >
            {sliderR?.map((item) => (
              <Box key={item?.id}>
                <Link
                  href={`/blog/${item?.id}`}
                  key={item?.id}
                  className={style.cardR}
                  //   style={{ width: `${cardWidth}px` }}
                >
                  <div className={style.imageWrapper}>
                    <Image
                      src={item?.image}
                      alt={item?.title}
                      width={400}
                      height={100}
                      className={style.imageR}
                    />
                  </div>
                  {item.title && (
                    <div className={style.content}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                      <Link
                        href={`/blog/${slides[0]?.id}`}
                        className={style.readMore}
                        style={{ display: "flex" }}
                      >
                        {" "}
                        Read More
                        <Image src={arrowSlide} alt="arrowSlide" />
                      </Link>
                    </div>
                  )}
                </Link>
              </Box>
            ))}
          </div>
        </GridCol>
      </Grid>
    </Container>
  );
};

export default AboutUsFooter;
