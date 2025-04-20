"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { postRequest, deleteRequest, getRequest } from "@/shared/api/chanci";
import { Accordion, Box, Card, Center, Group, Loader, Text, Title, Button } from "@mantine/core";
import { JsonView, darkStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import toastAlert from "@/shared/helpers/toast";
import useGeneratedPrompts from "@/shared/hooks/useGeneratedPrompts";

// Using the interfaces from the useGeneratedPrompts hook

const UserHeaderDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { generatedPrompt, loading, fetchGeneratedPrompts } = useGeneratedPrompts(Number(params.id));
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isRegenerating, setIsRegenerating] = useState<boolean>(false);

  useEffect(() => {
    if (params.id) {
      fetchGeneratedPrompts();
    }
  }, [params.id]);

  const handleDelete = async () => {
    if (!params.id) return;
    
    setIsDeleting(true);
    try {
      const res = await deleteRequest(
        `/api/GeneratedPrompts/Delete?UserAnswerHeaderId=${ params.id}`, {},
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
            disabled={generatedPrompt !== undefined}
          >
            Regenerate Result
          </Button>
          <Button 
            color="red" 
            onClick={handleDelete} 
            loading={isDeleting}
            disabled={generatedPrompt === undefined}
          >
            Delete Current Result
          </Button>
          <Button 
            color="teal" 
            onClick={() => router.push(`/ChanciAI/result/${params.id}`)}
            disabled={generatedPrompt === undefined}
          >
            View Result in Chanci
          </Button>
        </Group>
      </Group>
      <Text mb="md">User Answer Header ID: {params.id}</Text>
      
      {isDeleting || isRegenerating ? (
        <Center style={{ height: "50vh" }}>
          <Loader color="blue" size="lg" />
        </Center>
      ) : generatedPrompt === undefined ? (
        <Card shadow="sm" p="lg" radius="md" withBorder>
          <Text>No generated prompts found for this user header.</Text>
        </Card>
      ) : (
          <Card key={generatedPrompt.id} shadow="sm" p="lg" radius="md" withBorder mb="md">
            <Title order={3} mb="md">Generated Prompt</Title>
            
            <Accordion defaultValue="metadata">
              <Accordion.Item value="metadata">
                <Accordion.Control>
                  <Text fw={500}>Metadata</Text>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box>
                    <Group>
                      <Text fw={500}>ID:</Text>
                      <Text>{generatedPrompt.id}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>User Answer Header ID:</Text>
                      <Text>{generatedPrompt.userAnswerHeaderId}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Prompt Tokens:</Text>
                      <Text>{generatedPrompt.promptTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Completion Tokens:</Text>
                      <Text>{generatedPrompt.completionTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Total Tokens:</Text>
                      <Text>{generatedPrompt.totalTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Cached Tokens:</Text>
                      <Text>{generatedPrompt.cachedTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Audio Tokens:</Text>
                      <Text>{generatedPrompt.audioTokens}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Reasoning Tokens Completion:</Text>
                      <Text>{generatedPrompt.reasoningTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Audio Tokens Completion:</Text>
                      <Text>{generatedPrompt.audioTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Accepted Prediction Tokens Completion:</Text>
                      <Text>{generatedPrompt.acceptedPredictionTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Rejected Prediction Tokens Completion:</Text>
                      <Text>{generatedPrompt.rejectedPredictionTokensCompletion}</Text>
                    </Group>
                    <Group>
                      <Text fw={500}>Is Deleted:</Text>
                      <Text>{generatedPrompt.isDeleted ? "Yes" : "No"}</Text>
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
                      data={typeof generatedPrompt.generatedPrompt === 'string' ? JSON.parse(generatedPrompt.generatedPrompt) : (generatedPrompt.generatedPrompt || {})} 
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
                      data={typeof generatedPrompt.result === 'string' ? JSON.parse(generatedPrompt.result) : (generatedPrompt.result || {})} 
                      style={darkStyles}
                    />
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Card>
      )}
    </div>
  );
};

export default UserHeaderDetailPage;