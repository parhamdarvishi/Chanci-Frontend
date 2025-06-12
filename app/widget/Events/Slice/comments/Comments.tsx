import React from "react";
import Image from "next/image";
import quote from "@public/image/icons/quote.svg";
import style from "./Comments.module.scss";
import { Box, Card, Container } from "@mantine/core";

const Comments = () => {
  const data = [
    {
      id: 1,
      desc: "You’re bringing together art, AI, vision, and technology in such a unique way.",
      emp: "Julie Blair (AI Consultant)",
    },
    {
      id: 2,
      desc: "Jasmine has built a platform that brings together founders, investors, and industry leaders, creating opportunities for collaboration and meaningful connections.",
      emp: "Joanna Ou (Entrepreneur in the solar energy industry",
    },
    {
      id: 3,
      desc: "This event did exactly that – offering visibility, support, and even funding opportunities to help founders turn their ideas into scalable businesses.",
      emp: "Pritam Maiti ( Founder of Inspire Football Academy)",
    },
  ];

  return (
    <div className={style.wrapper}>
      <Container className={style.container}>
        <Image src={quote} alt="quote" />
        <Box className={style.cardBox}>
          {data?.map((item) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              className={style.card}
              key={item?.id}
            >
              <p>{item?.desc}</p>
              <span>{item?.emp}</span>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Comments;
