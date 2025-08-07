"use client";

import { useParams } from "next/navigation";
import BootcampPaymentComponent from "@shared/ui/BootcampPayment/BootcampPaymentComponent";

const Page = () => {
    const params = useParams();
    return (
        <>
            <BootcampPaymentComponent id={params.id as string} />
        </>
    );
};

export default Page;