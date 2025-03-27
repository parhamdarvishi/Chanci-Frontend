"use client";
import { getRequest } from "@/shared/api";
import { externalRefAddress } from "@/shared/constants/relative-url/candidate";
import { ExternalReferenceResponse } from "@/shared/types/other/other";
import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import { AboutUsSlider } from "@/shared/ui/Slider/slider";
import AboutUsList from "@/widget/AboutUs/AboutUsList";
import { SlideData } from "@/widget/Candidates/model";
import React, { useEffect, useState } from "react";

const AboutUs = () => {
  const [slides, setSlides] = useState<SlideData[]>([]);
  const allBlogs = async () => {
      const reqBody = {
        Skip: 0,
        Take: 100,
      };
      const res: ExternalReferenceResponse = await getRequest(
        externalRefAddress.GetAll,
        reqBody,
        false
      );
      if (res?.isSuccess) {
        setSlides(res.data?.items ?? []);
      }
      return [];
    };
  useEffect(() => {
    allBlogs();
  }, [])
  return (
    <div>
      <Header />
      <NavbarMain />
      <AboutUsList />
      <AboutUsSlider slides={slides}/>
      <Footer />
    </div>
  );
};

export default AboutUs;
