"use client";

import { useParams } from "next/navigation";
import CourseComponent from "@shared/ui/Course/CourseComponent";

const Page = () => {
    const params = useParams();
    return <CourseComponent id={params.id as string} />
};

export default Page;