"use client";

import { useState } from "react";
import { getRequest } from "@/shared/api/chanci";
import toastAlert from "@/shared/helpers/toast";
import { GeneratedPrompt } from "../types/chanci/chanci";


interface ApiResponse {
  isSuccess?: boolean;
  data?: {
    items?: GeneratedPrompt[];
  };
  message?: string;
}

/**
 * Custom hook to fetch generated prompts for a specific user answer header
 * @param userAnswerHeaderId - The ID of the user answer header
 * @returns Object containing the generated prompt, loading state, and refetch function
 */
const useGeneratedPrompts = (userAnswerHeaderId: number | string) => {
  const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | undefined>();
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGeneratedPrompts = async () => {
    setLoading(true);
    try {
      // Convert userAnswerHeaderId to number if it's a string
      const headerIdNumber = typeof userAnswerHeaderId === 'string' 
        ? Number(userAnswerHeaderId) 
        : userAnswerHeaderId;

      const reqBody = {
        "Filters[0].PropertyName": "UserAnswerHeaderId",
        "Filters[0].operation": 0,
        "Filters[0].value": headerIdNumber,
        Skip: 0,
        Take: 1
      };
      
      const res: ApiResponse = await getRequest(
        "/api/GeneratedPrompts/GetAll",
        reqBody,
        true
      );
      
      if (res?.isSuccess && res?.data?.items) {
        setGeneratedPrompt(res.data.items[0]);
      } else {
        setGeneratedPrompt(undefined);
      }
    } catch (error) {
      console.error("Error fetching generated prompts:", error);
      toastAlert("Error fetching generated prompts", "error");
      setGeneratedPrompt(undefined);
    } finally {
      setLoading(false);
    }
  };

  return {
    generatedPrompt,
    loading,
    fetchGeneratedPrompts
  };
};

export default useGeneratedPrompts;