"use client";

import {useParams, useRouter} from "next/navigation";
import BootcampComponent from "@shared/ui/Bootcamp/BootcampComponent";
import {bootcamp, BootcampPaymentTypes} from "@shared/types/bootcamp/bootcamp";
import {TableOnRequest} from "@shared/ui/Table";
import {TableColumns} from "@shared/ui/Table/model";
import {bootcampPaymentTypeAddress} from "@shared/constants/relative-url/bootcampPaymentType";
import PageHeader from "@shared/ui/PageHeader/pageHeader";
const Page = () => {
    const columns: TableColumns<BootcampPaymentTypes>[] = [
        { head: "id", key: "id" },
        { head: "title", key: "title" },
        { head: "amount", key: "amount" },
        { head: "currency", key: "currency" }
    ];
    const router = useRouter();
    const params = useParams();
    const url = `${bootcampPaymentTypeAddress.GetAll}?Filters[0].PropertyName=bootcampId&Filters[0].operation=0&Filters[0].value=${params.id as string}`;
    return (
        <>
            <PageHeader
                title="Bootcamp Payment Types"
                onAddClick={()=> router.push(`/panel/bootcamppayment/add/${params.id}`)}
            />
            <TableOnRequest<BootcampPaymentTypes>
                key={0}
                rowsPerPage={10}
                url={url}
                columns={columns}
                actionButtons={[
                    {
                        name: "View Details",
                        externalLink: "/panel/bootcamppayment/",
                    },
                ]}
            />
            <BootcampComponent id={params.id as string} />
        </>
    );
};

export default Page;