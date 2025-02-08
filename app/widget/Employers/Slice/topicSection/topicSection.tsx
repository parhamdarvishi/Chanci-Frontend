"use client";
import { Button } from "@mantine/core";
import Image, { StaticImageData } from "next/image";
import condidatesRes from "@public/image/responsive/condidatesRes.png";
import balanceRes from "@public/image/responsive/balanceRes.png";
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

  const displayImage =
    windowWidth > 768 ? image : condidates ? condidatesRes : balanceRes;

  return (
    <div className={styles.topicSection}>
      <Image
        src={displayImage}
        alt="Topic Photo"
        fill
        quality={100}
        priority
        className={styles.backgroundImage}
        style={{ objectFit: "fill", width: "100%" }}
        placeholder="blur"
      />

      <div className={condidates ? styles.content : styles.contentEmp}>
        <h1>{title}</h1>
        <p className={condidates ? styles.pCanDidate : styles.p}>{desc}</p>
        <Button
          size="lg"
          variant="gradient"
          gradient={{ from: "grape", to: "indigo", deg: 90 }}
          className={condidates ? styles.btnCanDidate : styles.btn}
        >
          {condidates && windowWidth < 600
            ? "Take the Free Assessment"
            : btnTxt}
        </Button>
      </div>
    </div>
  );
};

export default TopicSection;
