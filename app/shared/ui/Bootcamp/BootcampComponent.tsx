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
    Textarea
} from "@mantine/core";
import {modals} from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import {useForm} from "@mantine/form";
import {relativePaths} from "@/shared/constants/relative-url/other";
import Link from "next/link";
import {bootcamp, BootcampResponse} from "@shared/types/bootcamp/bootcamp";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";

const BootcampComponent = ({id}: { id?: string }) => {

    const router = useRouter();
    const [item, setItem] = useState<bootcamp | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);

    const form = useForm<bootcamp>({
        initialValues: {
            id: 0,
            title: "",
            instructorFullname: "",
            instructorLinkedinAddress: "",
            price: 0,
            discount: 0,
            description: "",
            bannerImagePath: "",
            cardImagePath: "",
            mobileImagePath: "",
            instructorImagePath: "",
            currency: "",
            isActive: true,
            isDeleted: false
        }
    });

    // Track if form has been modified
    const [formModified, setFormModified] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            const reqBody = {
                id: id,
                Skip: 0,
                Take: 1
            }
            try {
                const res: BootcampResponse = await getRequest(bootcampAddress.GetById, reqBody, false);
                const data = res?.data?.items?.[0];
                setItem(data);
                if (data) {
                    debugger;
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: data.id || 0,
                        title: data.title,
                        instructorFullname: data.instructorFullname,
                        instructorLinkedinAddress: data.instructorLinkedinAddress,
                        price: data.price,
                        discount: data.discount,
                        description: data.description,
                        bannerImagePath: data.bannerImagePath,
                        cardImagePath: data.cardImagePath,
                        mobileImagePath: data.mobileImagePath,
                        instructorImagePath: data.instructorImagePath,
                        currency: data.currency,
                        isActive: data.isActive,
                        isDeleted: data.isDeleted,
                    });
                    setFormModified(false);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                toastAlert("Failed to load job details", "error");
            }
        };

        if (id) {
            fetchData();
        } else {
            setItem(form.getInitialValues);
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

            const res = await postRequest(bootcampAddress.Update, formValues, true);
            if (res?.isSuccess) {
                toastAlert("Job updated successfully", "success");
                // Refresh the question data
                setItem(formValues as bootcamp);
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
            const res = await postRequest(bootcampAddress.Add, formValues, true);
            if (res?.isSuccess) {
                toastAlert("data added successfully", "success");
                router.push('/panel/bootcamp')
            } else {
                toastAlert("Failed to add data", "error");
            }
        } catch (error) {
            console.error("Error adding data:", error);
            toastAlert("Failed to create data", "error");
        } finally {
            setLoading(false);
        }
    }
    const handleDelete = () => {
        modals.openConfirmModal({
            title: "Delete",
            centered: true,
            styles: {
                content: {padding: "20px"},
                body: {padding: "0"}
            },
            children: (
                <Box>
                    <Text size="sm">
                        Are you sure you want to delete this? This action cannot be undone.
                    </Text>
                </Box>
            ),
            labels: {confirm: "Delete", cancel: "Cancel"},
            confirmProps: {color: "red"},
            onConfirm: async () => {
                try {
                    await deleteRequest(`${bootcampAddress}?Id=${id}`, {}, true);
                    toastAlert("deleted successfully", "success");
                    router.push(relativePaths.panel.fixedSectionList);
                } catch (error) {
                    console.error("Error deleting:", error);
                    toastAlert("Failed to delete", "error");
                }
            },
        });
    };

    return (
        <div style={{padding: "20px"}}>
            {item !== undefined ? <>
                <Group justify="space-between" mb="xl">
                    <Title order={2}>Details</Title>
                </Group>

                <Card shadow="sm" p="lg" radius="md" withBorder>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (id) {
                            handleUpdate();
                        } else handleCreate();
                    }}>
                        <Stack gap="md">
                            <Box>
                                <Text fw={500} mb={5}>
                                    Instructor Fullname:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("instructorFullname", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("instructorFullname").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Instructor Linkedin Address:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("instructorLinkedinAddress", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("instructorLinkedinAddress").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Price:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("price", +(e.target.value));
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("price").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    discount:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("discount", +(e.target.value));
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("discount").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    discount:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("discount", +(e.target.value));
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("discount").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    bannerImagePath:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("bannerImagePath", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("bannerImagePath").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    cardImagePath:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("cardImagePath", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("cardImagePath").value}
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
                                    mobileImagePath:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("mobileImagePath", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("mobileImagePath").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    instructorImagePath:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("instructorImagePath", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("instructorImagePath").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    currency:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("currency", e.target.value);
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("currency").value}
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
export default BootcampComponent;