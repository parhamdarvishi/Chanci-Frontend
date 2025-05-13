"use client";
import { blogAddress } from "@/shared/constants/relative-url/blog";
import { BlogItem } from "@/shared/types/chanci/blog";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";

const columns: TableColumns<BlogItem>[] = [
  { head: "Index", key: "index" },
  {
    head: "Title",
    key: "title",
    render: (value) =>
      typeof value === "string" && value.length > 100
        ? `${value.substring(0, 100)}...`
        : value.toString(),
  },
  {
    head: "Description",
    key: "description",
    render: (value) =>
      typeof value === "string" && value.length > 100
        ? `${value.substring(0, 100)}...`
        : value.toString(),
  },
];

const Page = () => {
  const router = useRouter();
  return (
    <div>
      <PageHeader
        title="Blogs Management"
        onAddClick={() => router.push("/panel/blogs/add")}
      />
      <TableOnRequest<BlogItem>
        key={0}
        rowsPerPage={10}
        url={blogAddress.GetAll}
        columns={columns}
        actionButtons={[
          {
            name: "View Details",
            externalLink: "/panel/blogs/",
          },
        ]}
      />
    </div>
  );
};

export default Page;
