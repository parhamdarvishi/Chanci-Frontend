"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest } from "@/shared/api";
import { Accordion, Box, Card, Center, Group, Loader, Text, Title } from "@mantine/core";
import ReactJson from "react-json-view";

interface GeneratedPrompt {
  id: number;
  userAnswerHeaderId: number;
  generatedPrompt: any;
  result: any;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  cachedTokens: number;
  audioTokens: number;
  reasoningTokensCompletion: number;
  audioTokensCompletion: number;
  acceptedPredictionTokensCompletion: number;
  rejectedPredictionTokensCompletion: number;
  isDeleted: boolean;
}

interface ApiResponse {
  isSuccess?: boolean;
  data?: {
    items?: GeneratedPrompt[];
  };
}

const UserHeaderDetailPage = () => {
  const params = useParams();
  const [generatedPrompts, setGeneratedPrompts] = useState<GeneratedPrompt[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchGeneratedPrompts = async () => {
      setLoading(true);
      try {
        // Fetch all data without filtering
        const reqBody = {
          Skip: 0,
          Take: 1000 // Increased to get more data
        };
        const res: ApiResponse = await getRequest(
          "/api/GeneratedPrompts/GetAll",
          reqBody,
          true
        );
        
        if (res?.isSuccess && res?.data?.items) {
          // Filter items with matching userAnswerHeaderId on client side
          const filteredPrompts = res.data.items.filter(
            (item) => item.userAnswerHeaderId === Number(params.id)
          );
          setGeneratedPrompts(filteredPrompts);
        }
      } catch (error) {
        console.error("Error fetching generated prompts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchGeneratedPrompts();
    }
  }, [params.id]);

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" size="lg" />
      </Center>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Title order={2} mb="xl">User Header Details</Title>
      <Text mb="md">User Answer Header ID: {params.id}</Text>
      
      {generatedPrompts.length === 0 ? (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>No generated prompts found for this user header.</Text>
        </Card>
      ) : (
        generatedPrompts.map((prompt, index) => (
          <Card key={prompt.id} shadow="sm" p="lg" radius="md" withBorder mb="md">
            <Title order={3} mb="md">Generated Prompt {index + 1}</Title>
            
            <Accordion defaultValue="metadata">
              <Accordion.Item value="metadata">
                <Accordion.Control>
                  <Text fw={500}>Metadata</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box>
                    <Group>
                      <Text fw={500}>ID:</Text>
                      <Text>{prompt.id}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>User Answer Header ID:</Text>
                      <Text>{prompt.userAnswerHeaderId}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Prompt Tokens:</Text>
                      <Text>{prompt.promptTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Completion Tokens:</Text>
                      <Text>{prompt.completionTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Total Tokens:</Text>
                      <Text>{prompt.totalTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Cached Tokens:</Text>
                      <Text>{prompt.cachedTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Audio Tokens:</Text>
                      <Text>{prompt.audioTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Reasoning Tokens Completion:</Text>
                      <Text>{prompt.reasoningTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Audio Tokens Completion:</Text>
                      <Text>{prompt.audioTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Accepted Prediction Tokens Completion:</Text>
                      <Text>{prompt.acceptedPredictionTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Rejected Prediction Tokens Completion:</Text>
                      <Text>{prompt.rejectedPredictionTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Is Deleted:</Text>
                      <Text>{prompt.isDeleted ? "Yes" : "No"}</Text>
                    </Group>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
              
              <Accordion.Item value="generatedPrompt">
                <Accordion.Control>
                  <Text fw={500}>Generated Prompt</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box style={{ maxHeight: "500px", overflow: "auto" }}>
                    <ReactJson 
                      src={typeof prompt.generatedPrompt === 'string' ? JSON.parse(prompt.generatedPrompt) : (prompt.generatedPrompt || {})} 
                      theme="monokai" 
                      displayDataTypes={false} 
                      collapsed={1}
                    />
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
              
              <Accordion.Item value="result">
                <Accordion.Control>
                  <Text fw={500}>Result</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box style={{ maxHeight: "500px", overflow: "auto" }}>
                    <ReactJson 
                      src={typeof prompt.result === 'string' ? JSON.parse(prompt.result) : (prompt.result || {})} 
                      theme="monokai" 
                      displayDataTypes={false} 
                      collapsed={1}
                    />
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card>
        ))
      )}
    </div>
  );
};

export default UserHeaderDetailPage;