"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest, deleteRequest, putRequest } from "@/shared/api";
import { Button, Card, Group, Text, Title, Stack, Box, Center, Loader, Textarea, Select } from "@mantine/core";
import { Question } from "@/shared/types/questions/index";
import { QuestionType, InputType, CategoryType, questionApiAddresses } from "@/shared/constants/relative-url/question";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";

/* const getQuestionType = (type: number | undefined): string => {
    if (type === undefined) return "NONE";
    return Object.entries(QuestionType).find(([_, value]) => value === type)?.[0]?.replace("_", " ") || "NONE";
};

const getInputType = (type: number | undefined): string => {
    if (type === undefined) return "NONE";
    return Object.entries(InputType).find(([_, value]) => value === type)?.[0]?.replace("_", " ") || "NONE";
};

const getCategoryType = (type: number | undefined): string => {
    if (type === undefined) return "NONE";
    return Object.entries(CategoryType).find(([_, value]) => value === type)?.[0] || "NONE";
}; */

const QuestionDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [question, setQuestion] = useState<Question | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm({
        initialValues: {
            id: 0,
            index: 0,
            type: 0,
            inputType: 0,
            text: "",
            category: 0
        }
    });

    // Track if form has been modified
    const [formModified, setFormModified] = useState<boolean>(false);

    useEffect(() => {
        const fetchQuestion = async () => {
            interface QuestionResponse {
                isSuccess?: boolean;
                data?: {
                    items?: any[]; // Adjust the type as necessary
                };
            };
            const reqBody = {
                id: params.id,
                Skip: 0,
                Take: 1
            }
            try {
                const res: QuestionResponse = await getRequest(`/api/Questions/GetById`, reqBody, false);
                const questionData = res?.data?.items?.[0];
                setQuestion(questionData);

                if (questionData) {
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: questionData.id || 0,
                        index: questionData.index || 0,
                        type: questionData.type?.toString() || "0",
                        inputType: questionData.inputType?.toString() || "0",
                        text: questionData.text || "",
                        category: questionData.category?.toString() || "0"
                    });

                    // Reset form modified state when loading new data
                    setFormModified(false);
                }
            } catch (error) {
                console.error("Error fetching question:", error);
                toastAlert("Failed to load question details", "error");
            }
        };

        if (params.id) {
            fetchQuestion();
        }
    }, [params.id]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // Convert string values back to numbers before sending to API
            const formValues = {
                ...form.values,
                id: Number(params.id),
                type: Number(form.values.type),
                inputType: Number(form.values.inputType),
                category: Number(form.values.category)
            };

            const res = await putRequest(`/api/Questions/Update`, formValues, true);
            if (res?.isSuccess) {
                toastAlert("Question updated successfully", "success");
                // Refresh the question data
                setQuestion(formValues as Question);
            } else {
                toastAlert("Failed to update question", "error");
            }
        } catch (error) {
            console.error("Error updating question:", error);
            toastAlert("Failed to update question", "error");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = () => {
        modals.openConfirmModal({
            title: "Delete Question",
            centered: true,
            styles: {
                content: { padding: "20px" },
                body: { padding: "0" }
            },
            children: (
                <Box>
                    <Text size="sm">
                        Are you sure you want to delete this question? This action cannot be undone.
                    </Text>
                </Box>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                try {
                    await deleteRequest(`${questionApiAddresses.Delete}?Id=${params.id}`, {}, true);
                    toastAlert("Question deleted successfully", "success");
                    router.push(relativePaths.panel.questionList);
                } catch (error) {
                    console.error("Error deleting question:", error);
                    toastAlert("Failed to delete question", "error");
                }
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            {question !== undefined ? <>
                <Group justify="space-between" mb="xl">
                    <Title order={2}>Question Details</Title>
                </Group>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text fw={500}>ID:</Text>
                                <Text>{question.id}</Text>
                            </Group>
                            <Box>
                                <Text fw={500} mb={5}>Type:</Text>
                                <Select
                                    data={Object.entries(QuestionType).map(([label, value]) => ({
                                        value: value.toString(),
                                        label: label.replace("_", " ")
                                    }))}
                                    placeholder="Select type"
                                    {...form.getInputProps('type')}
                                    onChange={(value) => {
                                        form.setFieldValue('type', Number(value));
                                        setFormModified(true);
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>Input Type:</Text>
                                <Select
                                    data={Object.entries(InputType).map(([label, value]) => ({
                                        value: value.toString(),
                                        label: label.replace("_", " ")
                                    }))}
                                    placeholder="Select input type"
                                    {...form.getInputProps('inputType')}
                                    onChange={(value) => {
                                        form.setFieldValue('inputType', Number(value));
                                        setFormModified(true);
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>Category:</Text>
                                <Select
                                    data={Object.entries(CategoryType).map(([label, value]) => ({
                                        value: value.toString(),
                                        label
                                    }))}
                                    placeholder="Select category"
                                    {...form.getInputProps('category')}
                                    onChange={(value) => {
                                        form.setFieldValue('category', Number(value));
                                        setFormModified(true);
                                    }}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>Text:</Text>
                                <Textarea
                                    minRows={4}
                                    style={{ width: "100%" }}
                                    {...form.getInputProps('text')}
                                    onChange={(e) => {
                                        form.setFieldValue('text', e.currentTarget.value);
                                        setFormModified(true);
                                    }}
                                />
                            </Box>

                            <Group justify="flex-end" mt="md">
                                <Button
                                    variant="filled"
                                    color="red"
                                    onClick={handleDelete}
                                    type="button"
                                >
                                    Delete
                                </Button>
                                <Button
                                    variant="filled"
                                    color="blue"
                                    type="submit"
                                    loading={loading}
                                    disabled={!formModified}
                                >
                                    Update
                                </Button>
                            </Group>
                        </Stack>
                    </form>
                </Card> </> : <Center> <Loader color="blue" /> </Center>}
        </div>
    );
};

export default QuestionDetailPage;