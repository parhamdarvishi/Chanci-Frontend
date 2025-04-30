"use client";

import FixSectionComponent from "@/shared/ui/FixedSection/FixSectionComponent";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();
    return <FixSectionComponent id={params.id as string} />
};

export default Page;