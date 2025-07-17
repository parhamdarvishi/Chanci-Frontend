"use client";

import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import {bootcamp} from "@shared/types/bootcamp/bootcamp";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";
import PageHeader from "@shared/ui/PageHeader/pageHeader";
import {useRouter} from "next/navigation";

const columns: TableColumns<bootcamp>[] = [
    { head: "id", key: "id" },
    { head: "title", key: "title" },
    { head: "price", key: "price" },
    { head: "isActive", key: "isActive" }
];

const Page = () => {
    const router = useRouter();
      return (
        <div>
            <PageHeader
                title="Job Management"
                onAddClick={()=> router.push('/panel/bootcamp/add')}
            />
          <TableOnRequest<bootcamp>
            key={0}
            rowsPerPage={10}
            url={bootcampAddress.GetAll}
            columns={columns}
            actionButtons={[
              {
                name: "View Details",
                externalLink: "/panel/bootcamp/",
              },
            ]}
          />
        </div>
      );
};

export default Page;
