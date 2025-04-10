"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest, postRequest, deleteRequest } from "@/shared/api/chanci";
import { Accordion, Box, Card, Center, Group, Loader, Text, Title, Button } from "@mantine/core";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import toastAlert from "@/shared/helpers/toast";

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
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

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
      toastAlert("Error fetching generated prompts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchGeneratedPrompts();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!params.id) return;
    
    setIsDeleting(true);
    try {
      const reqBody = {
        UserAnswerHeaderId: Number(params.id)
      };
      const res = await deleteRequest(
        "/api/GeneratedPrompts/Delete",
        reqBody,
        true
      );
      
      if (res?.isSuccess) {
        toastAlert("Result deleted successfully", "success");
        // Refresh the data
        await fetchGeneratedPrompts();
      } else {
        toastAlert(res?.message || "Failed to delete result", "error");
      }
    } catch (error) {
      console.error("Error deleting result:", error);
      toastAlert("Error deleting result", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRegenerate = async () => {
    if (!params.id) return;
    
    setIsRegenerating(true);
    try {
      const reqBody = {
        UserAnswerHeaderId: Number(params.id)
      };
      const res = await getRequest(
        "/api/UserAnswers/ConvertAnswersToPromptCommand",
        reqBody,
        true
      );
      
      if (res?.isSuccess) {
        toastAlert("Result regenerated successfully", "success");
        // Refresh the data
        await fetchGeneratedPrompts();
      } else {
        toastAlert(res?.message as string || "Failed to regenerate result", "error");
      }
    } catch (error) {
      console.error("Error regenerating result:", error);
      toastAlert("Error regenerating result", "error");
    } finally {
      setIsRegenerating(false);
    }
  };

  if (loading) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader color="blue" size="lg" />
      </Center>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Group justify="space-between" mb="xl">
        <Title order={2}>User Header Details</Title>
        <Group justify="flex-end">
        <Button 
            color="blue" 
            onClick={handleRegenerate} 
            loading={isRegenerating}
            disabled={generatedPrompts.length > 0}
          >
            Regenerate Result
          </Button>
          <Button 
            color="red" 
            onClick={handleDelete} 
            loading={isDeleting}
            disabled={generatedPrompts.length === 0}
          >
            Delete Current Result
          </Button>
        </Group>
      </Group>
      <Text mb="md">User Answer Header ID: {params.id}</Text>
      
      {isDeleting || isRegenerating ? (
        <Center style={{ height: "50vh" }}>
          <Loader color="blue" size="lg" />
        </Center>
      ) : generatedPrompts.length === 0 ? (
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
                    <JsonView 
                      data={typeof prompt.generatedPrompt === 'string' ? JSON.parse(prompt.generatedPrompt) : (prompt.generatedPrompt || {})} 
                      style={darkStyles}
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
                    <JsonView 
                      data={typeof prompt.result === 'string' ? JSON.parse(prompt.result) : (prompt.result || {})} 
                      style={darkStyles}
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