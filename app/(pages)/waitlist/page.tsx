"use client";
import Waitlist from "@/widget/WaitList/Waitlist";
import { Suspense } from "react";

const WaitlistPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Waitlist />
    </Suspense>
  );
};

export default WaitlistPage;