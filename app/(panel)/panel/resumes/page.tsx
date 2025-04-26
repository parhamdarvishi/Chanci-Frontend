"use client";

import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

type TResume = {
  id: string;
  index: number;
  userId: string;
  filename: string;
  path: string;
  size: number;
};

const columns: TableColumns<TResume>[] = [
  { head: "Index", key: "index" },
  { head: "User Id", key: "userId" },
  {
    head: "Filename",
    key: "filename",
    render: (value: any) => {
      // Extract file extension and show a portion of the filename
      const lastDotIndex = value.lastIndexOf('.');
      if (lastDotIndex !== -1) {
        const extension = value.substring(lastDotIndex);
        // Show last 20 chars of filename + extension to make it readable
        const displayName = value.length > 20
          ? '...' + value.substring(value.length - 20)
          : value;
        return displayName;
      }
      return value;
    }
  },
  {
    head: "Size",
    key: "size",
    render: (value: number): string => {
      // Convert bytes to MB with 2 decimal places
      return (value / (1024 * 1024)).toFixed(2) + " MB";
    }
  },
];
const Resumes = () => {
  const userid = useSearchParams().get("userId");
  const filters = {
    "Filters[0].PropertyName": "userId",
    "Filters[0].operation": 0,
    "Filters[0].value": userid
  }
  return (
    <div>
      <TableOnRequest<TResume>
        rowsPerPage={10}
        url="/api/Resume/GetAll"
        columns={columns}
        actionButtons={[
          {
            name: "Download",
            keyForUrl: "path",
            url: (id: any) => `${id}`,
          },
        ]}
        {... (userid && {filters : filters})}
      />
    </div>
  );
}

const Page = () => {

  return (
    <Suspense>
      <Resumes />
    </Suspense>)
};

export default Page;