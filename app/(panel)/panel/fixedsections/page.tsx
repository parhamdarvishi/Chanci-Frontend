"use client";
import { fixedSectionAddress } from "@/shared/constants/relative-url/fixedsection";
import { CategoryType } from "@/shared/constants/relative-url/question";
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
  
  const columns: TableColumns<FixedSection>[] = [
    { head: "Index", key: "index" },
    {
      head: "Category",
      key: "categoryType",
      render: (value: string | number | undefined) => {
        if (typeof value === "string") return value;
        return getCategoryType(value as number | undefined);
      },
    },
    {
        head: "Inner Html",
        key: "innerHtml",
        render: (value) => (typeof value === 'string' && value.length > 100) ? `${value.substring(0, 100)}...` : value.toString()
    },
    { head: "Order", key: "order" },
  ];
  
  const Page = () => {
    const router = useRouter();
    return (
      <div>
        <PageHeader
          title="Questions Management"
          onAddClick={()=> router.push('/panel/fixedsections/add')}
        />
        <TableOnRequest<FixedSection>
          key={0}
          rowsPerPage={10}
          url={fixedSectionAddress.GetAll}
          columns={columns}
          actionButtons={[
            {
              name: "View Details",
              externalLink: "/panel/fixedsections/",
            },
          ]}
        />
      </div>
    );
  };
  
  export default Page;
  