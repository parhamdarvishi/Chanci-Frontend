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
import {
    BootcampPaymentTypes,
    BootcampPaymentTypesResponse
} from "@shared/types/bootcamp/bootcamp";
import {bootcampPaymentTypeAddress} from "@shared/constants/relative-url/bootcampPaymentType";

const BootcampPaymentComponent = ({id , bootcampId}: { id: string , bootcampId: string }) => {

    const router = useRouter();
    const [item, setItem] = useState<BootcampPaymentTypes | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    
    const form = useForm<BootcampPaymentTypes>({
        initialValues: {
            id: 0,
            title: "",
            amount: 0,
            currency: "",
            isDeleted: false,
            bootcampId: 0,
        }
    });

    const [formModified, setFormModified] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchData = async () => {
            const reqBody = {
                id: id,
                Skip: 0,
                Take: 1
            }
            try {
                const res: BootcampPaymentTypesResponse = await getRequest(bootcampPaymentTypeAddress.GetById, reqBody, false);
                const data = res?.data?.items?.[0];
                setItem(data);
                if (data) {
                    // Convert numeric values to strings for Select components
                    form.setValues({
                        id: data.id || 0,
                        title: data.title,
                        bootcampId: data.bootcampId,
                        amount: data.amount,
                        currency: data.currency,
                        isDeleted: data.isDeleted,
                    });
                    setFormModified(false);
                }
            } catch (error) {
                console.error("Error fetching job:", error);
                toastAlert("Failed to load job details", "error");
            }
        };
        debugger;
        if (id && id.length > 0) {
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

            const res = await postRequest(bootcampPaymentTypeAddress.Update, formValues, true);
            if (res?.isSuccess) {
                toastAlert("updated successfully", "success");
                setItem(formValues as BootcampPaymentTypes);
            } else {
                toastAlert("Failed to update", "error");
            }
        } catch (error) {
            console.error("Error updating:", error);
            toastAlert("Failed to update", "error");
        } finally {
            setLoading(false);
        }
    };
    const handleCreate = async () => {
        if (form.validate().hasErrors) 
            return;
        setLoading(true);
        try {
            form.values.bootcampId = Number(bootcampId);
            const formValues = {
                ...form.values
            };
            const res = await postRequest(bootcampPaymentTypeAddress.Add, formValues, true);
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
                    await deleteRequest(`${bootcampPaymentTypeAddress.Delete}?Id=${id}`, {}, true);
                    toastAlert("deleted successfully", "success");
                    router.push('/panel/bootcamp');
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
                                    Amount:
                                </Text>
                                <Textarea
                                    onChange={(e) => {
                                        form.setFieldValue("amount", +(e.target.value));
                                        setFormModified(true);
                                    }}
                                    defaultValue={form.getInputProps("amount").value}
                                />
                            </Box>
                            <Box>
                                <Text fw={500} mb={5}>
                                    Currency:
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
export default BootcampPaymentComponent;