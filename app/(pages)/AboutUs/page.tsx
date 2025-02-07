import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import AboutUsList from "@/widget/AboutUs/AboutUsList";
import React from "react";

const page = () => {
  return (
    <div>
      <Header />
      <NavbarMain />
      <AboutUsList />
      <Footer />
    </div>
  );
};

export default page;
