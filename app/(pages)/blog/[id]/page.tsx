"use client";
import Footer from "@/shared/ui/Footer/footer";
import Header from "@/shared/ui/Header/header";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import SingleBlogList from "@/widget/SingleBlog/SingleBlogList";
import { useParams } from "next/navigation";
import React from "react";

const SingleBlog = () => {
  const { id } = useParams();
  return (
    <div>
      <Header />
      <NavbarMain />
      <SingleBlogList id={Number(id)} />
      <Footer />
    </div>
  );
};

export default SingleBlog;
