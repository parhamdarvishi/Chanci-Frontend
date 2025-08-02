"use client";

import { useParams } from "next/navigation";
import BootcampComponent from "@shared/ui/Bootcamp/BootcampComponent";
import {bootcamp} from "@shared/types/bootcamp/bootcamp";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";
import {TableOnRequest} from "@shared/ui/Table";
import {TableColumns} from "@shared/ui/Table/model";
import {bootcampPaymentTypeAddress} from "@shared/constants/relative-url/bootcampPaymentType";
const Page = () => {
    const columns: TableColumns<bootcamp>[] = [
        { head: "id", key: "id" },
        { head: "title", key: "title" },
        { head: "price", key: "price" },
        { head: "isActive", key: "isActive" }
    ];

    const params = useParams();

    return (
        <>
            <TableOnRequest<bootcamp>
                key={0}
                rowsPerPage={10}
                url={bootcampPaymentTypeAddress.GetAll}
                columns={columns}
                actionButtons={[
                    {
                        name: "View Details",
                        externalLink: "/panel/bootcamp/",
                    },
                ]}
            />
            <BootcampComponent id={params.id as string} />
        </>
    );
};

export default Page;