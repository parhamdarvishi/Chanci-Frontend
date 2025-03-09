"use client";
import Payment from "@/widget/Payment/Payment";
import { Suspense } from "react";

const PaymentPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <Payment />
    </Suspense>
  );
};

export default PaymentPage;