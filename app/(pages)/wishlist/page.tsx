"use client";
import Wishlist from "@/widget/Wishlist/Wishlist";
import { Suspense } from "react";

const WishlistPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Wishlist />
    </Suspense>
  );
};

export default WishlistPage;