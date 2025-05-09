"use client";

import { eventAddresses } from "@/shared/constants/relative-url/event";
import { TableOnRequest } from "@/shared/ui/Table";
import { ActionButtons, TableColumns } from "@/shared/ui/Table/model";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { useRouter } from "next/navigation";

type TEventRow = {
  id: number;
  index: number
  shortTitle: string;
  hostDate: string;
};

const columns: TableColumns<TEventRow>[] = [
  { head: "index", key: "index" },
  { head: "Title", key: "shortTitle" },
  {
    head: "Date",
    key: "hostDate",
  },
];

const actionButtons: ActionButtons[] = [
  {
    name: "View Details",
    url: (id: number) => `/panel/events/${id}`,
  },
];

const Page = () => {
  const router = useRouter();
  return (
    <>
      <PageHeader
        title="All Events"
        onAddClick={() => router.push("/panel/events/add")}
      />

      <TableOnRequest<TEventRow>
        url={eventAddresses.GetAll}
        rowsPerPage={10}
        columns={columns}
        actionButtons={actionButtons}
      />
    </>
  );
};

export default Page;
