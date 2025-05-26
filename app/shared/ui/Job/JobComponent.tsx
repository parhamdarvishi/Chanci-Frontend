import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import {getRequest, deleteRequest, postRequest} from "@/shared/api";
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
import {modals} from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import {useForm} from "@mantine/form";
import {relativePaths} from "@/shared/constants/relative-url/other";
import {IndustryResponse, OnlyIndustryResponse} from "@shared/types/chanci/industry";
import {industryAddress} from "@shared/constants/relative-url/industry";
import {Job, JobResponse} from "@shared/types/chanci/job";
import {jobAddress} from "@shared/constants/relative-url/job";
import Link from "next/link";

const JobComponent = ({id}: { id?: string }) => {

    const router = useRouter();
    const [jobItem, setJobItem] = useState<Job | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const [industries, setIndustry] = useState<any>([]);

    const form = useForm<Job>({
        initialValues: {
            id: 0,
            industryId: 0,
            title: "",
            description: "",
            link: "",
            salary: "",
            responsibilities: "",
            basicQualifications: "",
            preferredQualifications: ""
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
        const fetchJob = async () => {
            const reqBody = {
                id: id,
                Skip: 0,
                Take: 1
            }
            try {
                const res: JobResponse = await getRequest(jobAddress.GetById, reqBody, false);
                const jobData = res?.data?.items?.[0];
                setJobItem(jobData);
                if (jobData) {
                    debugger;
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: jobData.id || 0,
                        industryId: jobData.industryId,
                        title: jobData.title,
                        description: jobData.description,
                        link: jobData.link,
                        salary: jobData.salary,
                        responsibilities: jobData.responsibilities,
                        basicQualifications: jobData.basicQualifications,
                        preferredQualifications: jobData.preferredQualifications,
                    });

                    // Reset form modified state when loading new data
                    setFormModified(false);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                toastAlert("Failed to load job details", "error");
            }
        };

        if (id) {
            fetchJob();
        } else {
            setJobItem(form.getInitialValues);
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

            const res = await postRequest(jobAddress.Update, formValues, true);
            if (res?.isSuccess) {
                toastAlert("Job updated successfully", "success");
                // Refresh the question data
                setJobItem(formValues as Job);
            } else {
                toastAlert("Failed to update Job", "error");
            }
        } catch (error) {
            console.error("Error updating Job:", error);
            toastAlert("Failed to update Job", "error");
        } finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        if (form.validate().hasErrors) return
        setLoading(true);
        try {
            debugger
            // Convert string values back to numbers before sending to API
            const formValues = {
                ...form.values
            };
            const res = await postRequest(jobAddress.Add, formValues, true);
            if (res?.isSuccess) {
                toastAlert("job added successfully", "success");
                // Refresh the question data
                router.push('/panel/jobs')
            } else {
                toastAlert("Failed to add job", "error");
            }
        } catch (error) {
            console.error("Error adding job:", error);
            toastAlert("Failed to create job", "error");
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = () => {
        modals.openConfirmModal({
            title: "Delete Job",
            centered: true,
            styles: {
                content: {padding: "20px"},
                body: {padding: "0"}
            },
            children: (
                <Box>
                    <Text size="sm">
                        Are you sure you want to delete this Job? This action cannot be undone.
                    </Text>
                </Box>
            ),
            labels: {confirm: "Delete", cancel: "Cancel"},
            confirmProps: {color: "red"},
            onConfirm: async () => {
                try {
                    await deleteRequest(`${jobAddress}?Id=${id}`, {}, true);
                    toastAlert("Job deleted successfully", "success");
                    router.push(relativePaths.panel.fixedSectionList);
                } catch (error) {
                    console.error("Error deleting Job:", error);
                    toastAlert("Failed to delete Job", "error");
                }
            },
        });
    };

    return (
        <div style={{padding: "20px"}}>
            {jobItem !== undefined ? <>
                <Group justify="space-between" mb="xl">
                    <Title order={2}>job Details</Title>
                </Group>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (id) {
                            handleUpdate();
                        } else handleCreate();
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
                                    Title:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("title", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("title").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Description:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("description", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("description").value}
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
                                <Link style={{paddingTop: "10px", paddingBottom: "10px",}}
                                      href={form.getInputProps("link").value} target="_blank">Open Link</Link>
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Salary:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("salary", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("salary").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Responsibilities:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("responsibilities", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("responsibilities").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Basic Qualifications:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("basicQualifications", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("basicQualifications").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    preferred Qualifications:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("preferredQualifications", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("preferredQualifications").value}
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
                </Card> </> : <Center> <Loader color="blue"/> </Center>}
        </div>
    );
};
export default JobComponent;