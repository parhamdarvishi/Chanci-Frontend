"use client";

import BootcampComponent from "@shared/ui/Bootcamp/BootcampComponent";
import { useParams } from "next/navigation";
import BootcampPaymentComponent from "@shared/ui/BootcampPayment/BootcampPaymentComponent";

const Page = () => {
    const params = useParams();
    return (
        <>
            <BootcampPaymentComponent id={""} bootcampId={params.id as string} />
        </>
    );
};

export default Page;