"use client";
import { CategoryType } from "@/shared/constants/relative-url/question";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";
import {Course} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";

const getCategoryType = (type: number | undefined): string => {
    if (type === undefined) return "NONE";
    return (
        Object.entries(CategoryType).find(([_, value]) => value === type)?.[0] ||
        "NONE"
    );
};

const columns: TableColumns<Course>[] = [
    { 
        head: "Index", 
        key: "id" 
    },
    {
        head: "Course Name",
        key: "name"
    },
    {
        head: "Industry Name",
        key: "industryTitle"
    }
];

const Page = () => {
    const router = useRouter();
    return (
        <div>
            <PageHeader
                title="Course Management"
                onAddClick={()=> router.push('/panel/courses/add')}
            />
            <TableOnRequest<Course>
                key={0}
                rowsPerPage={10}
                url={courseAddress.GetAll}
                columns={columns}
                actionButtons={[
                    {
                        name: "View Details",
                        externalLink: "/panel/courses/",
                    },
                ]}
            />
        </div>
    );
};

export default Page;
  