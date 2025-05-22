import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest, deleteRequest, postRequest } from "@/shared/api";
import { Button, Card, Group, Text, Title, Stack, Box, Center, Loader, Select, NumberInput } from "@mantine/core";
import { CategoryType } from "@/shared/constants/relative-url/question";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";
import Editor from "@/shared/ui/RichTextEditor/RichTextEditor";
import {Course, CourseResponse} from "@shared/types/chanci/course";
import {courseAddress} from "@shared/constants/relative-url/course";

const CourseComponent = ({ id }: { id?: string }) => {
    const router = useRouter();
    const [course, setCourse] = useState<Course | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

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
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: courseData.id || 0,
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
            // Convert string values back to numbers before sending to API
            const formValues = {
                ...form.values
            };
            const res = await postRequest(courseAddress.Add, formValues, true);
            if (res?.isSuccess) {
                toastAlert("Fixed Section added successfully", "success");
                // Refresh the question data
                router.push('/panel/fixedsections')
            } else {
                toastAlert("Failed to add fixedSection", "error");
            }
        } catch (error) {
            console.error("Error adding fixedSection:", error);
            toastAlert("Failed to create fixedSection", "error");
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
                            <Box>
                                <Text fw={500}>Name:</Text>
                                <NumberInput {...form.getInputProps('order')} value={course.name} onChange={(value) => {
                                    form.setFieldValue('order', Number(value));
                                    setFormModified(true);
                                }} />
                            </Box>
                            <Box>
                                <Text fw={500}>Level:</Text>
                                <NumberInput {...form.getInputProps('minValue')} value={course?.level || ""} onChange={(value) => {
                                    form.setFieldValue('minValue', Number(value));
                                    setFormModified(true);
                                }} />
                            </Box>
                            <Box>
                                <Text fw={500}>Cost:</Text>
                                <NumberInput {...form.getInputProps('maxValue')} value={course?.cost || ""} onChange={(value) => {
                                    form.setFieldValue('maxValue', Number(value));
                                    setFormModified(true);
                                }} />
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