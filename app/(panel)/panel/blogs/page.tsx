"use client";
import { blogAddress } from "@/shared/constants/relative-url/blog";
import { CategoryType } from "@/shared/constants/relative-url/question";
import { BlogItem, BlogResponse } from "@/shared/types/chanci/blog";
import { FixedSection } from "@/shared/types/chanci/fixedSection";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";

const getCategoryType = (type: number | undefined): string => {
  if (type === undefined) return "NONE";
  return (
    Object.entries(CategoryType).find(([_, value]) => value === type)?.[0] ||
    "NONE"
  );
};

const columns: TableColumns<BlogItem>[] = [
  { head: "Index", key: "index" },
  {
    head: "Title",
    key: "title",
    render: (value: string | number | undefined) => {
      if (typeof value === "string") return value;
      return getCategoryType(value as number | undefined);
    },
  },
  {
    head: "Description",
    key: "description",
    render: (value) =>
      typeof value === "string" && value.length > 100
        ? `${value.substring(0, 100)}...`
        : value.toString(),
  },
  // { head: "Order", key: "order" },
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
