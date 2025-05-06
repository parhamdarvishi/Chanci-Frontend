"use client";

import BlogComponent from "@/shared/ui/BlogComponent/BlogComponent";
import { useParams } from "next/navigation";

const Page = () => {
    const params = useParams();
    return <BlogComponent id={params.id as string} />
};

export default Page;