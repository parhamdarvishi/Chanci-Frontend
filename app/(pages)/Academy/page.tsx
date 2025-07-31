"use client"

import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import React from "react";
import AcademyList from "@/widget/Academies/AcademyList";

const Events = () => {

   

    return (
        <div>
            <Header/>
            <NavbarMain/>
            <AcademyList/>
            <Footer/>
        </div>

    );
};

export default Events;
