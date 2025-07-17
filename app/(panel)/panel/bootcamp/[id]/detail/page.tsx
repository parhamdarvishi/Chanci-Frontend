"use client";

import { useParams } from "next/navigation";
import BootcampComponent from "@shared/ui/Bootcamp/BootcampComponent";

const Page = () => {
    const params = useParams();
    return <BootcampComponent id={params.id as string} />
};

export default Page;