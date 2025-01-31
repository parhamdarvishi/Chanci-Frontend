"use client";
import { Container, Grid } from "@mantine/core";
import Image from "next/image";
import React, { useState } from "react";
import event2 from "@public/image/events/event2.png";
import Event1 from "@public/image/events/gallery/Event1.jpg";
import Event3 from "@public/image/events/gallery/Event3.jpg";
import Event4 from "@public/image/events/gallery/Event4.jpg";
import Event5 from "@public/image/events/gallery/Event5.jpg";
import Event6 from "@public/image/events/gallery/Event6.jpg";
import Event7 from "@public/image/events/gallery/Event7.jpg";
import Event8 from "@public/image/events/gallery/Event8.jpg";
import Event9 from "@public/image/events/gallery/Event9.jpg";
import Event10 from "@public/image/events/gallery/Event10.jpg";
import Event11 from "@public/image/events/gallery/Event11.jpg";
import Event12 from "@public/image/events/gallery/Event12.jpg";
import style from "./gallery.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <>
      <NavbarMain />
      <Container style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <div className={style.header}>
          <h2>
            <span
              style={{
                borderBottom: "4px solid #5E62FC",
                borderRadius: "4px",
                fontWeight: "400",
              }}
            >
              O
            </span>
            ur Events {""}
            <span>Gallery</span>
          </h2>
        </div>
        <Container className={style.galleryBox}>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={event2}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(event2.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event1}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event1.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event3}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event3.src)}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event6}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event6.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event5}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event5.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event4}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event4.src)}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event7}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event7.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event8}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event8.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 270, sm: 240 }}>
              <Image
                src={Event9}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event9.src)}
              />
            </Grid.Col>
          </Grid>
          <Grid>
            <Grid.Col span={{ base: 12, md: 3 }} h={{ md: 280, sm: 240 }}>
              <Image
                src={Event10}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event10.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 4 }} h={{ md: 280, sm: 240 }}>
              <Image
                src={Event11}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event11.src)}
              />
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 5 }} h={{ md: 280, sm: 240 }}>
              <Image
                src={Event12}
                alt="eventImage"
                className={style.img}
                loading="lazy"
                onClick={() => handleImageClick(Event12.src)}
              />
            </Grid.Col>
          </Grid>
        </Container>

        {selectedImage && (
          <div className={style.selectedImageContainer}>
            <Image
              src={selectedImage}
              alt="Selected Event"
              width={500}
              height={600}
              quality={100}
              className={style.selectedImage}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className={style.closeButton}
            >
              Close
            </button>
          </div>
        )}
      </Container>
    </>
  );
};

export default Gallery;
