"use client";
import React from "react";
import { Card, Image, Text } from "@mantine/core";

const CardContent = ({ image, title, description }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder style={{ maxWidth: 300 }}>
      <Card.Section>
        <Image src={image} alt={title} height={160} />
      </Card.Section>

      <Text  size="lg" mt="md">
        {title}
      </Text>
      <Text size="sm" color="dimmed" mt="xs">
        {description}
      </Text>
    </Card>
  );
};

export default CardContent;
