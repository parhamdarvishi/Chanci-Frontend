import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import CondidatesList from "@/widget/Candidates/CondidatesList";
import React from "react";

const Page = () => {
  return (
    <div>
      <Header />
      <NavbarMain />
      <CondidatesList />
      <Footer />
    </div>
  );
};

export default Page;
