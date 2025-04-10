"use client";
import { paymentAddresses } from "@/shared/constants/relative-url/payment";
import { TableColumns, TableOnRequest } from "@/shared/ui/Table";
import React from "react";
import { useRouter } from "next/navigation";

type TPayment = {
  id: number;
  price: number;
  currency: string;
  paiedSuccessfull: boolean;
};

const Page = () => {
  const router = useRouter();

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
      sortBy="id"
      sortDirection="desc"
    />
  );
};

export default Page;