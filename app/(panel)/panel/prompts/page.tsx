"use client";
import { promptAddresses, PromptRole } from "@/shared/constants/relative-url/prompt";
import { TPrompt } from "@/shared/types/other/other";
import PageHeader from "@/shared/ui/PageHeader/pageHeader";
import { TableOnRequest } from "@/shared/ui/Table";
import { TableColumns } from "@/shared/ui/Table/model";
import { useRouter } from "next/navigation";
import React from "react";



const Page = () => {
    const router = useRouter();
    const columns: TableColumns<TPrompt>[] = [
        { head: "ID", key: "id" },
        {
            head: "Role",
            key: "role",
            render: (value) => {
                switch (value) {
                    case PromptRole.SYSTEM: return "System";
                    case PromptRole.USER: return "User";
                    case PromptRole.ASSISTANT: return "Assistant";
                    default: return String(value);
                }
            }
        },
        {
            head: "Content",
            key: "content",
            render: (value) => (typeof value === 'string' && value.length > 100) ? `${value.substring(0, 100)}...` : value.toString()
        },
        { head: "Active", key: "isActive", render: (value) => value ? "Yes" : "No" },
    ];

    const actionButtons = [
        {
            name: "View Details",
            url: (id: any) => `/panel/prompts/${id}`,
        },
    ];

    return (
        <div>
            <PageHeader
                title="Prompt Management"
                onAddClick={() => router.push("/panel/prompts/add")}
            />
            <TableOnRequest<TPrompt>
                rowsPerPage={10}
                url={promptAddresses.GetAll}
                columns={columns}
                actionButtons={actionButtons}
            />
        </div>
    );
};

export default Page;