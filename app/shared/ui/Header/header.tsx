"use client";
import { Button } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "./header.module.scss";
import { useRouter } from "next/navigation";

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  const goToTarget = () => {
    router.push("/Candidates#target-Ambassador");
  };

  const goToEvent = () => {
    router.push("/Events#sponser");
  };

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
    <div className={style.wrapper}>
      <h4 className={style.headerTitle} onClick={goToEvent}>
        Want to become an event sponsor?
      </h4>
      <Button className={style.btn} onClick={goToTarget}>
        {isMobile
          ? "Become a student ambassador"
          : "Become a student ambassador at your university!"}
      </Button>
    </div>
  );
};

export default Header;
