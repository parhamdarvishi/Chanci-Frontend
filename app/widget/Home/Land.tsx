import Navbar from "@shared/ui/Navbar/navbar";
import React from "react";
import TopTalents from "./Slice/TopTalents/topTalents";
import AboutUs from "./Slice/AbouUs/aboutUs";

const Land = () => {
  return (
    <div>
      <Navbar />
      <TopTalents />
      <AboutUs />
    </div>
  );
};

export default Land;
