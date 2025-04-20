"use client";
//These folder will be deleted after we make sure no routes come to these files//



/* import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRequest } from "@/shared/api/chanci";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { ConvertAnswersToPromptResponse } from "@/shared/types/chanci/chanci";
import { AnswerToPrompts } from "@/shared/ui/ChanciAI/AnswerToPrompt";
 */
// Define interfaces for the data structure

const Page = () => {
/*   const { id } = useParams();
  const [answersToPrompt, setAnswersToPrompt] = useState<ConvertAnswersToPromptResponse | null>(null);

  const getAllAnswers = async () => {
    const query = {
      UserAnswerHeaderId: id,
    };
    const { data } = await getRequest(
      userAddresses.ConvertAnswersToPromptCommand,
      query
    );
    setAnswersToPrompt(data as ConvertAnswersToPromptResponse);
  };

  useEffect(() => {
    getAllAnswers();
  }, []);

  if (!answersToPrompt) return null;
 */
  return (
    {/* <AnswerToPrompts answerPrompt={answersToPrompt} />  */}
    
  );
};

export default Page;
