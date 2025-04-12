"use client";
import { paymentAddresses } from "@/shared/constants/relative-url/payment";
import { TableOnRequest } from "@/shared/ui/Table";
import React, { useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { TableColumns } from "@/shared/ui/Table/model";

type TPayment = {
  id: number;
  price: number;
  currency: string;
  paiedSuccessfull: boolean;
};

const Page = () => {
  const userid = useSearchParams().get("userId");
  const filters =  {
    "Filters[0].PropertyName": "userId",
    "Filters[0].operation": 0,
    "Filters[0].value": userid
  }
  console.log(filters);
  console.log(userid);
  const columns: TableColumns<TPayment>[] = [
    { head: "ID", key: "id" },
    { head: "Price", key: "price" },
    { head: "Currency", key: "currency" },
    { head: "Paid", key: "paiedSuccessfull", render: (value) => (value ? "Yes" : "No") },
  ];

  const actionButtons = [
    {
      name: "View Details",
      externalLink: "/panel/payments/"
    }
  ];

  return (
    <TableOnRequest<TPayment>
      rowsPerPage={10}
      url={paymentAddresses.GetAllPayments}
      columns={columns}
      actionButtons={actionButtons}
      {... (userid && {filters : filters})}
    />
  );
};

export default Page;