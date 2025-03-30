"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRequest } from "@/shared/api/chanci";
import { userAddresses } from "@/shared/constants/relative-url/user";
import { Divider, Table } from "@mantine/core";

// Define interfaces for the data structure
interface IndustryRecommendation {
  industryName: string;
  industryDescription: string;
  why: string;
  percentage: number;
  jobTitles: string[];
}

interface AnswerData {
  cvScore: number;
  personality: string;
  highestScoringPersonality: string;
  certificateSuggestions: string[];
  courseSuggestions: string[];
  hardSkillPotentialGaps: string[];
  industryRecommendations: IndustryRecommendation[];
  networkingOpportunitiesSuggestions: string[];
  softSkillPotentialGaps: string[];
  strengths: string[];
}

interface IndustryScore {
  order: number;
  name: string;
  score: number;
}

interface ConvertAnswersToPromptResponse{
  jobRecommendation: AnswerData;
  industryScores: IndustryScore[];
}

const Page = () => {
  const { id } = useParams();
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

  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>

      <div style={{ maxWidth: "800px" }}>
        <h4>personality</h4>
        <div>{answersToPrompt.jobRecommendation.personality}</div>
      </div>

      <div>
        <h4>highestScoringPersonality</h4>
        <div>{answersToPrompt.jobRecommendation.highestScoringPersonality}</div>
      </div>

      <div>
        <h4>certificateSuggestions</h4>
        {answersToPrompt.jobRecommendation.certificateSuggestions?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>courseSuggestions</h4>
        {answersToPrompt.jobRecommendation.courseSuggestions?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>hardSkillPotentialGaps</h4>
        {answersToPrompt.jobRecommendation.hardSkillPotentialGaps?.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>

      <div>
        <h4>The industries that you select</h4>
        {answersToPrompt.jobRecommendation.industryRecommendations?.map((item, index) => (
          <div key={index} style={{ padding: ".5rem" }}>
            <div>
              <span style={{ color: "#08CD6A" }}>Name:</span>{" "}
              {item.industryName}
            </div>
            <div style={{ maxWidth: "800px" }}>
              <span style={{ color: "#08CD6A" }}>Description:</span>{" "}
              {item.industryDescription}
            </div>
            <div style={{ maxWidth: "800px" }}>
              <span style={{ color: "#08CD6A" }}>Why:</span> {item.why}
            </div>
            <div>
              <span style={{ color: "#08CD6A" }}>Percentage:</span>{" "}
              {item.percentage}
            </div>
            <div>
              <span style={{ color: "#08CD6A" }}>JobTitles:</span>
              <div>
                {item.jobTitles?.map((jobTitle, idx) => (
                  <div key={idx}>{jobTitle}</div>
                ))}
              </div>
            </div>
            <Divider style={{ marginTop: ".5rem" }} />
          </div>
        ))}
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>networkingOpportunitiesSuggestions:</h4>
        <div>
          {answersToPrompt.jobRecommendation.networkingOpportunitiesSuggestions?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>softSkillPotentialGaps:</h4>
        <div>
          {answersToPrompt.jobRecommendation.softSkillPotentialGaps?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>strengths:</h4>
        <div>
          {answersToPrompt.jobRecommendation.strengths?.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      </div>

      <div style={{ padding: ".5rem 0" }}>
        <h4>Industry Scores:</h4>
        <Table striped highlightOnHover withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Index</Table.Th>
              <Table.Th>Industry</Table.Th>
              <Table.Th>Score</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {answersToPrompt.industryScores?.map((item, index) => (
              <Table.Tr key={index}>
                <Table.Td>{index + 1}</Table.Td>
                <Table.Td>{item.name}</Table.Td>
                <Table.Td>{item.score}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </div>
    </div>
  );
};

export default Page;
