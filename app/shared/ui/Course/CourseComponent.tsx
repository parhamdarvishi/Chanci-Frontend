import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getRequest, deleteRequest, postRequest } from "@/shared/api";
import {
    Button,
    Card,
    Group,
    Text,
    Title,
    Stack,
    Box,
    Center,
    Loader,
    Select,
    NumberInput,
    Textarea
} from "@mantine/core";
import { CategoryType } from "@/shared/constants/relative-url/question";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";
import Editor from "@/shared/ui/RichTextEditor/RichTextEditor";
import {Course, CourseResponse} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";
import {IndustryResponse, OnlyIndustryResponse} from "@shared/types/chanci/industry";
import {industryAddress} from "@shared/constants/relative-url/industry";

const CourseComponent = ({ id }: { id?: string }) => {
    const router = useRouter();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [industries, setIndustry] = useState<any>([]);
    
    const form = useForm<Course>({
        initialValues: {
            id: 0,
            industryId: 0,
            name: "",
            cost: "",
            credential: "",
            duration: "",
            level: "",
            impact: "",
            link:"",
            platform:"",
            review: ""
        }
    });

    // Track if form has been modified
    const [formModified, setFormModified] = useState<boolean>(false);

    useEffect(() => {
        const fetchIndustries = async () => {
            try {
                const reqBody = {
                    Skip: 0,
                    Take: 10000
                }
                const res: OnlyIndustryResponse = await getRequest(industryAddress.GetAllFromIndustryModule, reqBody, false);
                const industryOptions = res?.data?.items?.map((industry) => ({
                    value: industry.id.toString(),
                    label: industry.title,
                }));
                setIndustry(industryOptions);
            } catch (error) {
                console.error("Failed to fetch roles", error);
            } finally {
                setLoading(false);
            }
        };
        fetchIndustries();
    }, []);
    
    useEffect(() => {
        const fetchCourse = async () => {
            const reqBody = {
                id: id,
                Skip: 0,
                Take: 1
            }
            try {
                const res: CourseResponse = await getRequest(courseAddress.GetById, reqBody, false);
                const courseData = res?.data?.items?.[0];
                setCourse(courseData);
                if (courseData) {
                    debugger;
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: courseData.id || 0,
                        industryId: courseData.industryId.toString() || "0",
                        review: courseData.review,
                        platform: courseData.platform,
                        cost: courseData?.cost,
                        link: courseData?.link,
                        duration: courseData?.duration,
                        name: courseData?.name,
                        credential: courseData?.credential,
                        level: courseData?.level,
                        impact: courseData?.impact
                    });

                    // Reset form modified state when loading new data
                    setFormModified(false);
                }
            } catch (error) {
                console.error("Error fetching course:", error);
                toastAlert("Failed to load course details", "error");
            }
        };

        if (id) {
            fetchCourse();
        }
        else {
            setCourse(form.getInitialValues);
        }
    }, [id]);

    const handleUpdate = async () => {
        setLoading(true);
        try {
            // Convert string values back to numbers before sending to API
            const formValues = {
                ...form.values,
                id: Number(id)
            };

            const res = await postRequest(courseAddress.Update, formValues, true);
            if (res?.isSuccess) {
                toastAlert("Course updated successfully", "success");
                // Refresh the question data
                setCourse(formValues as Course);
            } else {
                toastAlert("Failed to update Course", "error");
            }
        } catch (error) {
            console.error("Error updating Course:", error);
            toastAlert("Failed to update Course", "error");
        } finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        if(form.validate().hasErrors) return
        setLoading(true);
        try {
            debugger
            // Convert string values back to numbers before sending to API
            const formValues = {
                ...form.values
            };
            const res = await postRequest(courseAddress.Add, formValues, true);
            if (res?.isSuccess) {
                toastAlert("course added successfully", "success");
                // Refresh the question data
                router.push('/panel/courses')
            } else {
                toastAlert("Failed to add course", "error");
            }
        } catch (error) {
            console.error("Error adding course:", error);
            toastAlert("Failed to create course", "error");
        } finally {
            setLoading(false);
        }
    }
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
                        Are you sure you want to delete this Course? This action cannot be undone.
                    </Text>
                </Box>
            ),
            labels: { confirm: "Delete", cancel: "Cancel" },
            confirmProps: { color: "red" },
            onConfirm: async () => {
                try {
                    await deleteRequest(`${courseAddress}?Id=${id}`, {}, true);
                    toastAlert("Course deleted successfully", "success");
                    router.push(relativePaths.panel.fixedSectionList);
                } catch (error) {
                    console.error("Error deleting Course:", error);
                    toastAlert("Failed to delete Course", "error");
                }
            },
        });
    };

    return (
        <div style={{ padding: "20px" }}>
            {course !== undefined ? <>
                <Group justify="space-between" mb="xl">
                    <Title order={2}>course Details</Title>
                </Group>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (id) {
                            handleUpdate();
                        }
                        else handleCreate();
                    }}>
                        <Stack gap="md">
                            <Select
                                label="Idnustries"
                                placeholder="Select a Industry"
                                data={industries}
                                mb="md"
                                required
                                {...form.getInputProps("industryId")}
                            />
                            <Box>
                                <Text fw={500} mb={5}>
                                    Name:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("name", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("name").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    level:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("level", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("level").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Cost:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("cost", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("cost").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Duration:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("duration", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("duration").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Credential:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("credential", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("credential").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Impact:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("impact", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("impact").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Platform:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("platform", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("platform").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Link:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("link", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("link").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Review:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("review", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("review").value}
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
                                {id ? (<Button
                                    variant="filled"
                                    color="blue"
                                    type="submit"
                                    loading={loading}
                                    disabled={!formModified}
                                >
                                    Update
                                </Button>) : <Button
                                    variant="filled"
                                    color="blue"
                                    type="submit"
                                    loading={loading}
                                    disabled={!formModified}
                                >
                                    Add
                                </Button>}
                            </Group>
                        </Stack>
                    </form>
                </Card> </> : <Center> <Loader color="blue" /> </Center>}
        </div>
    );
};
export default CourseComponent;