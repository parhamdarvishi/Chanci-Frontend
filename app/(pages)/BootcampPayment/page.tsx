"use client";
import { Suspense } from "react";
import BootcampPayment from "@/widget/Payment/Bootcamp/BootcampPayment";

const PaymentPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <BootcampPayment />
    </Suspense>
  );
};

export default PaymentPage;