"use client";
import React from "react";
import { Card, Image, Text } from "@mantine/core";
import { StaticImageData } from "next/image";

interface props {
  image: StaticImageData | string;
  description: string;
  title: string;
}

const CardContent = ({ image, title, description }: props) => {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ maxWidth: 300 }}
    >
      <Card.Section>
        <Image src={image} alt={title} height={160} />
      </Card.Section>

      <Text size="lg" mt="md">
        {title}
      </Text>
      <Text size="sm" color="dimmed" mt="xs">
        {description}
      </Text>
    </Card>
  );
};

export default CardContent;
