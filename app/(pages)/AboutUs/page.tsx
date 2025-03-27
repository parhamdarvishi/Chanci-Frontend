import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Slider from "@/shared/ui/Slider/slider";
import AboutUsList from "@/widget/AboutUs/AboutUsList";
import { SlideData } from "@/widget/Candidates/model";
import empBlogGenZ from "@public/image/blog/empBlogGenZ.png";
import empBlogDei from "@public/image/blog/empBlogDei.png";
import empBlogSolve from "@public/image/blog/empBlogSolve.png";
import React, { useState } from "react";

const page = () => {
  const slides: SlideData[] = [
    {
      id: 4,
      title: "Gen Z at Work: 8 Changes Your Company Can’t Ignore",
      description:
        "Generation Z, born between the mid-1990s and early 2010s, now represents nearly a third of the global workforce...",
      image: empBlogGenZ,
    },
    {
      id: 5,
      title:
        "The Role of Automation in Solving the UK’s 1.3 Million Job Market Gap",
      description:
        "The UK job market is facing a major challenge, with over 1.3 million job ... ",
      image: empBlogSolve,
    },
    {
      id: 6,
      title: "The Current State of DEI in the UK",
      description:
        "Recent surveys show a noticeable shift in how UK businesses view DEI. A 2023 report found that 57% of companies ...",
      image: empBlogDei,
    },
  ];
  return (
    <div>
      <Header />
      <NavbarMain />
      <AboutUsList />
      <Slider slides={slides} title={false} />
      <Footer />
    </div>
  );
};

export default page;
