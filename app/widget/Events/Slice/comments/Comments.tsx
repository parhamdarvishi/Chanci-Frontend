import React from "react";
import Image from "next/image";
import quote from "@public/image/icons/quote.svg";
import style from "./Comments.module.scss";
import { Box, Card, Container } from "@mantine/core";

const Comments = () => {
  const data = [
    {
      id: 1,
      desc: "This was my first experience with NGN, and I was blown away! The energy, the connections, and the incredible speakers made it unforgettable. Kudos to Jasmine and the team for creating such an outstanding platform!",
      emp: "Anahita (Journalist)",
    },
    {
      id: 2,
      desc: "NGN events have been a game-changer for me. The dynamic atmosphere and the chance to connect with top professionals in the UK’s start-up ecosystem have been truly inspiring. My network and insights have grown exponentially!",
      emp: "Goodness (CEO of Immersely)",
    },
    {
      id: 3,
      desc: "I’ve always been excited about NGN’s events, and they never disappoint! The vibrant networking opportunities and high-quality connections have truly expanded my professional circle. Thank you for these exceptional experiences!",
      emp: "Navid (Co-Founder of UBT Srl)",
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
