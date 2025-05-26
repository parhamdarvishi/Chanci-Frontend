"use client";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";
import {Job} from "@shared/types/chanci/job";
import {jobAddress} from "@shared/constants/relative-url/job";

const columns: TableColumns<Job>[] = [
    {
        head: "Index",
        key: "id"
    },
    {
        head: "Title",
        key: "title"
    }
];

const Page = () => {
    const router = useRouter();
    return (
        <div>
            <PageHeader
                title="Job Management"
                onAddClick={()=> router.push('/panel/jobs/add')}
            />
            <TableOnRequest<Job>
                key={0}
                rowsPerPage={10}
                url={jobAddress.GetAll}
                columns={columns}
                actionButtons={[
                    {
                        name: "View Details",
                        externalLink: "/panel/jobs/",
                    },
                ]}
            />
        </div>
    );
};

export default Page;
  