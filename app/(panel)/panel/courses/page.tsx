"use client";
import { CategoryType } from "@/shared/constants/relative-url/question";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";
import {Course} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";

const columns: TableColumns<Course>[] = [
    { 
        head: "Index", 
        key: "id" 
    },
    {
        head: "Course Name",
        key: "name"
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
  