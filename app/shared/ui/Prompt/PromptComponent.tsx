"use client";
import { Box, Button, Card, Select, Textarea, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { postRequest } from "@/shared/api";
import { promptAddresses } from "@/shared/constants/relative-url/prompt";
import toastAlert from "@/shared/helpers/toast";
import { TPrompt } from "@/shared/types/other/other";

type PromptFormValues = {
  role: string;
  content: string;
  minimalContent: string;
  isActive: boolean;
};

type PromptComponentProps = {
  readOnly?: boolean;
  prompt?: TPrompt;
};

const PromptComponent: React.FC<PromptComponentProps> = ({
  readOnly = false,
  prompt
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<PromptFormValues>({
    initialValues: {
      role: prompt?.role.toString() || "1",
      content: prompt?.content || "",
      minimalContent: prompt?.minimalContent || "",
      isActive: prompt?.isActive ?? true,
    },
    validate: {
      content: (value) => (value.trim().length > 0 ? null : "Content is required"),
    },
  });

  const handleSubmit = async (values: PromptFormValues) => {
    setLoading(true);
    try {
      const payload = {
        role: parseInt(values.role),
        content: values.content,
        minimalContent: values.minimalContent,
        isActive: values.isActive,
      };

      const response = await postRequest(promptAddresses.Add, payload, true);
      
      if (response?.isSuccess) {
        toastAlert("Prompt added successfully", "success");
        router.push("/panel/prompts");
      } else {
        toastAlert(response?.message as string || "Failed to add prompt", "error");
      }
    } catch (error) {
      console.error("Error adding prompt:", error);
      toastAlert("An unexpected error occurred", "error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box p="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {!readOnly && <Title order={2} mb="lg">
          Add New Prompt
        </Title>}

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Select
            label="Role"
            placeholder="Select a role"
            data={[
              { value: "1", label: "System" },
              { value: "2", label: "User" },
              { value: "3", label: "Assistant" },
            ]}
            mb="md"
            required
            disabled={readOnly}
            {...form.getInputProps("role")}
          />

          <Textarea
            label="Content"
            placeholder="Enter prompt content"
            autosize
            readOnly={readOnly}
            minRows={9}
            rows={10}
            mb="md"
            required
            style={{ minHeight: "300px" }}
            {...form.getInputProps("content")}
          />

          <Textarea
              label="Minimal Content"
              placeholder="Enter prompt minimal content (For Demo)"
              autosize
              readOnly={readOnly}
              minRows={9}
              rows={10}
              mb="md"
              required
              style={{ minHeight: "300px" }}
              {...form.getInputProps("minimalContent")}
          />
          
          {!readOnly && <Button type="submit" loading={loading}>
            Add Prompt
          </Button>}
        </form>
      </Card>
    </Box>
  );
};

export default PromptComponent;