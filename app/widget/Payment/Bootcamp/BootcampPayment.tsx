"use client";


import React, {useState, FormEvent, useEffect} from "react";
import {Box, Card, Input, Button, Select} from "@mantine/core";
import style from "../payment.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import axios from "axios";
import {useSearchParams} from "next/navigation";
import toastAlert from "@/shared/helpers/toast";
import {useForm} from "@mantine/form";

import {getRequest} from "@/shared/api";
import {bootcamp, BootcampResponse} from "@shared/types/bootcamp/bootcamp";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";
import {API_BASE_URL} from "@shared/config/env";

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount / 100);
};
const BootcampPayment: React.FC = () => {
    const searchParams = useSearchParams();
    const bootcampId = searchParams.get("bootcampId");
    const [bootcamp, setBootcamp] = useState<bootcamp>();
    const [loading, setLoading] = useState<boolean>(false);
    const fieldForm = useForm({
        initialValues: {
            fullName: "",
            email: "",
            linkedInProfile: "",
            bootcampPaymentTypeId: null as number | null,
        },
        validate: {
            fullName: (value) => (value === "" ? "Please field the fullName" : null),
            email: (value) => (value === "" ? "Please field the email" : null),
            linkedInProfile: (value) => (value === "" ? "Please enter your LinkedIn profile" : null),
            bootcampPaymentTypeId: (value) =>
                value === null ? "Please choose an option" : null,
        },
        transformValues: (values) => ({
            bootcampPaymentTypeId: values.bootcampPaymentTypeId
                ? Number(values.bootcampPaymentTypeId)
                : null,
        }),
    });

    // Validate using Yup
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        debugger;
        if (fieldForm.validate().hasErrors) return;
        // Submit form data via Axios if validation passes
        setLoading(true);
        try {
            fieldForm.values.bootcampPaymentTypeId = Number(
                fieldForm.values.bootcampPaymentTypeId
            );
            const res = await axios.post(
                `${API_BASE_URL}/api/Bootcamp/pay`,
                {...fieldForm.values, id: Number(bootcampId)},
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res?.data?.isSuccess && res?.data?.statusCode === 200) {
                const finalRes = res?.data?.data?.data;
                const paymenturl = finalRes.checkout_Url;
                window.location.href = paymenturl;
            } else {
                toastAlert(res?.data?.message as string, "error");
                return;
            }
        } catch (_error) {
            console.log(_error);
            toastAlert("Network Error", "error");
        } finally {
            setLoading(false);
        }
    };
    const bootcampFetch = async () => {
        const reqBody = {
            Id: bootcampId,
            Skip: 0,
            Take: 1,
        };
        const res: BootcampResponse = await getRequest(
            bootcampAddress.GetById,
            reqBody,
            false
        );
        if (res?.isSuccess && Array.isArray(res.data?.items) && res.data.items.length > 0) {
            setBootcamp(res.data?.items[0]);
        }
        return [];
    };
    useEffect(() => {
        bootcampFetch();
    }, []);
    return (
        <>
            <NavbarMain/>
            <div className={style.paymentWrapper}>
                <Card
                    shadow="sm"
                    padding="lg"
                    radius="md"
                    withBorder
                    className={style.paymentCard}
                >
                    <p>
                        Please enter your full name, email address, and LinkedIn profile and click the button
                        to proceed with your payment and complete the booking process for
                        participating in the bootcamp.
                    </p>
                    <form onSubmit={handleSubmit}>
                        <Box>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                    description: style.description,
                                }}
                                withAsterisk
                                label="Full name"
                                description="Please enter your full name"
                            >
                                <Input
                                    classNames={{input: style.input}}
                                    placeholder="For e.g. example@gmail.com"
                                    {...fieldForm.getInputProps("fullName")}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                    description: style.description,
                                }}
                                withAsterisk
                                label="Email"
                            >
                                <Input
                                    classNames={{input: style.input}}
                                    placeholder="For e.g. example@gmail.com"
                                    {...fieldForm.getInputProps("email")}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                    description: style.description,
                                }}
                                withAsterisk
                                label="LinkedIn Profile"
                            >
                                <Input
                                    classNames={{input: style.input}}
                                    placeholder="e.g. https://linkedin.com/in/yourprofile"
                                    {...fieldForm.getInputProps("linkedInProfile")}
                                />
                            </Input.Wrapper>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                    description: style.description,
                                }}
                                label="Type"
                            >
                                <Select
                                    checkIconPosition="right"
                                    data={bootcamp?.bootcampPaymentTypes?.map((paymentType) => ({
                                        value: paymentType.id.toString(),
                                        label: `${paymentType.title} - ${
                                            paymentType.currency === "GBP"
                                                ? `${formatCurrency(paymentType.amount)}`
                                                : paymentType.amount
                                        }`,
                                    }))}
                                    classNames={{
                                        input: style.input,
                                        label: style.label,
                                        error: style.errorMessages,
                                    }}
                                    //   dropdownOpened
                                    placeholder="Choose a payment type"
                                    {...fieldForm.getInputProps("bootcampPaymentTypeId")}
                                />
                            </Input.Wrapper>
                        </Box>

                        <Button
                            type="submit"
                            className={style.button}
                            mt="lg"
                            loading={loading}
                            disabled={!bootcampId}
                        >
                            Pay Now
                            {!loading && (
                                <Image
                                    className={style.cardArrow}
                                    src={arrowRight}
                                    alt="arrowRight"
                                    width={22}
                                />
                            )}
                        </Button>
                    </form>
                </Card>
            </div>
        </>
    );
};

export default BootcampPayment;
