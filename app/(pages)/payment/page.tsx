"use client";
import { Suspense } from "react";
import EventPayment from "@/widget/Payment/Event/EventPayment";

const PaymentPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <EventPayment />
    </Suspense>
  );
};

export default PaymentPage;