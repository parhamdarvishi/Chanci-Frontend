"use client";

import { useParams } from "next/navigation";
import JobComponent from "@/shared/ui/Job/JobComponent";

const Page = () => {
    const params = useParams();
    return <JobComponent id={params.id as string} />
};

export default Page;