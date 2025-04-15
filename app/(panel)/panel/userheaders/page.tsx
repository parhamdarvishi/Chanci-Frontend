"use client";

import { TableOnRequest } from "@/shared/ui/Table";
import { UserHeaders } from "@/shared/types/other/other";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { TableColumns } from "@/shared/ui/Table/model";

const columns: TableColumns<UserHeaders>[] = [
  { head: "Index", key: "index" },
  { head: "User Id", key: "userId" },
  { head: "Full Name", key: "fullName" },
  { head: "Email", key: "email" },
  { head: "Created At", key: "createAt" },
];

const Page = () => {
  return (
    <div>
      <TableOnRequest<UserHeaders>
        key={0}
        rowsPerPage={10}
        url={chanciAddresses.getUserHeaders}
        columns={columns}
        actionButtons={[
          {
            name: "View Details",
            externalLink: "/panel/userheaders/",
          },
        ]}
      />
    </div>
  );
};

export default Page;
