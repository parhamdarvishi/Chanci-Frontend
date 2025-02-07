import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import EmployersList from "@/widget/Employers/EmployersList";
import React from "react";

const Employers = () => {
  return (
    <div>
      <Header />
      <NavbarMain />
      <EmployersList />
      <Footer />
    </div>
  );
};

export default Employers;
