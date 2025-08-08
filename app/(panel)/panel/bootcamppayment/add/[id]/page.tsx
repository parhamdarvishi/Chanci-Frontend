"use client";

import BootcampComponent from "@shared/ui/Bootcamp/BootcampComponent";
import BootcampPaymentComponent from "@shared/ui/BootcampPayment/BootcampPaymentComponent";
import {useParams} from "next/navigation";

const Page = () => {
    const params = useParams();
    return (
        <>
            <BootcampPaymentComponent id={""} bootcampId={params.id as string} />
        </>
    );
};

export default Page;