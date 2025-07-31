import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import SingleEvent from "@/widget/Events/SingleEvent";
import React from "react";
import SingleAcademy from "@/widget/Academies/SingleAcademy";

export default async function Event({
  params,
}: {
  params: Promise<{ id: number }>
}) {
  const {id} = await params;
  return (
    <div>
      <Header />
      <NavbarMain />
      <SingleAcademy bootcampId={id} />
      <Footer />
    </div>
  );
};