"use client";
import PaymentVerify from "@/widget/Payment/PaymentVerify";
import { Suspense } from "react";

const PaymentVerifyPage = ()=> {
    return(
        <Suspense fallback={<div></div>}>
        <PaymentVerify />
      </Suspense>
    )
}

export default PaymentVerifyPage;