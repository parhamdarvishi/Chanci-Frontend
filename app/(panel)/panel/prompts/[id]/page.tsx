"use client";
import { getRequest } from "@/shared/api";
import { promptAddresses, PromptRole } from "@/shared/constants/relative-url/prompt";
import { ApiResponse, TPrompt } from "@/shared/types/other/other";
import PromptComponent from "@/shared/ui/Prompt/PromptComponent";
import { Box, Loader, Text, Badge } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";


const Page = () => {
  const params = useParams();
  const [prompt, setPrompt] = useState<TPrompt | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPromptDetail = async () => {
    setLoading(true);
    try {
      const res: ApiResponse<TPrompt> = await getRequest(
        promptAddresses.GetAll,
        {
          Skip: 0,
          Take: 1,
          "Filters[0].PropertyName": "id",
          "Filters[0].Value": params.id,
        },
        true
      );
      if (res?.isSuccess && res?.data?.items && res?.data?.items?.length > 0) {
        setPrompt(res.data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching prompt details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromptDetail();
  }, [params.id]);

  if (loading) {
    return (
      <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <Loader />
      </Box>
    );
  }

  if (!prompt) {
    return (
      <Box style={{ padding: "2rem" }}>
        <Text>Prompt not found</Text>
      </Box>
    );
  }
  return (
    <PromptComponent readOnly={true} prompt={prompt} />
  );
};

export default Page;