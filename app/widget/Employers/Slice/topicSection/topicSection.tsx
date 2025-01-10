"use client";
import { Button } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import condidatesRes from "@public/image/responsive/condidatesRes.png";
import styles from "./topicSection.module.scss";
import { useEffect, useState } from "react";

interface TopicSectionProps {
  image: StaticImageData | string;
  btnTxt: string;
  title: string;
  desc: string;
  condidates: boolean;
}

const TopicSection = ({
  image,
  btnTxt,
  title,
  desc,
  condidates,
}: TopicSectionProps) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle window resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const displayImage = windowWidth > 600 ? image : condidatesRes;

  return (
    <div className={styles.topicSection}>
      <Image
        src={displayImage}
        alt="Topic Photo"
        fill
        quality={100}
        priority
        className={styles.backgroundImage}
        style={{ objectFit: "fill" }}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
          '<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 1 1"><rect width="1" height="1" fill="#18181B"/></svg>'
        ).toString("base64")}`}
      />

      <div className={styles.content}>
        <h1>{title}</h1>
        <p>{desc}</p>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 90 }}
        >
          {btnTxt}
        </Button>
      </div>
    </div>
  );
};

export default TopicSection;
