"use client";
import { Suspense } from "react";
import EventPaymentVerify from "@/widget/Payment/Event/EventPaymentVerify";

const PaymentVerifyPage = ()=> {
    return(
        <Suspense fallback={<div></div>}>
        <EventPaymentVerify />
      </Suspense>
    )
}

export default PaymentVerifyPage;