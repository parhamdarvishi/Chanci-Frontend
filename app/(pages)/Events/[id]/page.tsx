import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import SingleEvent from "@/widget/Events/SingleEvent";
import React from "react";

const Event = () => {
  return (
    <div>
      <Header />
      <NavbarMain />
      <SingleEvent />
      <Footer />
    </div>
  );
};

export default Event;
