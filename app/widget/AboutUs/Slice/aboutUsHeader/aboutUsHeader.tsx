import Image from "next/image";
import React, { useEffect, useState } from "react";
import aboutUsHeader from "@public/image/widget/aboutUs/AboutUs.png";
import aboutRes from "@public/image/responsive/aboutRes.png";
import style from "./aboutusHeader.module.scss";

const AboutUsHeader = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <Image
        quality={100}
        className={style.imageHeader}
        src={isMobile ? aboutRes : aboutUsHeader}
        alt="aboutUsImage"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default AboutUsHeader;
