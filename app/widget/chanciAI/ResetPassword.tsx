
import {
    Box,
    Button,
    Grid,
    GridCol,
    Input,
    Loader,
    PasswordInput,
} from "@mantine/core";
import React, { useState, useEffect, Suspense } from "react";
import ChanciLogin from "@public/image/chanciAI/login.png";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
import avatars from "@public/image/chanciAI/avatars.svg";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "@mantine/form";
import toastAlert from "@/shared/helpers/toast";
import style from "@/widget/chanciAI/login.module.scss";
import { postRequest } from "@/shared/api";
const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const code = searchParams.get('Code');

    useEffect(() => {
        if (!code) {
            toastAlert("Invalid or missing reset code", "error");
            router.push("/user/login");
        }
    }, [code, router]);

    const form = useForm({
        initialValues: {
            newPassword: "",
            confirmPassword: "",
        },
        validate: {
            newPassword: (value) =>
                value.length < 8
                    ? "Password must be at least 8 characters long"
                    : null,
            confirmPassword: (value, values) =>
                value !== values.newPassword
                    ? "Passwords do not match"
                    : null,
        },
    });

    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.validate().hasErrors) return;
        setLoading(true);

        try {
            const res = await postRequest(
                '/api/User/UpdatePassword',
                {
                    resetPasswordCode: code,
                    newPassword: form.values.newPassword,
                },
                false
            );

            if (res?.isSuccess) {
                toastAlert("Password has been reset successfully", "success");
                setTimeout(() => {
                    router.push("/user/login");
                }, 10000)
            } else {
                toastAlert(res?.message as string || "Failed to reset password", "error");
            }
        } catch (error: any) {
            const message = error?.response?.data?.message || "An error occurred";
            toastAlert(message, "error");
        } finally {
            setLoading(false);
        }
    };
    return (
        <form onSubmit={handleResetPassword}>
            <Grid className={style.wrapper}>
                <GridCol
                    span={{ base: 12, md: 6 }}
                    className={style.loginDesc}
                    style={{
                        marginTop: "3rem",
                        gap: "0.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Box
                        className={style.loginHeader}
                        style={{ gap: "1.1rem !important" }}
                    >
                        <Image src={Title} alt="ChanciAI" width={250} loading="lazy" />
                        <Image src={avatars} alt="ChanciAI" width={300} loading="lazy" />
                        <Box>
                            <h2
                                style={{
                                    textAlign: "center",
                                    fontWeight: "400",
                                    fontSize: "22px",
                                    margin: ".1rem 0",
                                }}
                            >
                                Reset Your Password
                            </h2>
                        </Box>
                    </Box>
                    <Box className={style.form}>
                        <Box>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                }}
                                label="New Password"
                            >
                                <PasswordInput
                                    classNames={{ input: style.input }}
                                    placeholder="Enter new password"
                                    {...form.getInputProps("newPassword")}
                                />
                            </Input.Wrapper>
                        </Box>
                        <Box>
                            <Input.Wrapper
                                classNames={{
                                    root: style.root,
                                    label: style.label,
                                }}
                                label="Confirm Password"
                            >
                                <PasswordInput
                                    classNames={{ input: style.input }}
                                    placeholder="Confirm your password"
                                    {...form.getInputProps("confirmPassword")}
                                />
                            </Input.Wrapper>
                        </Box>
                        <Button
                            variant="filled"
                            type="submit"
                            className={loading ? style.submitBtn : style.submitBtnActive}
                            disabled={loading}
                        >
                            {loading ? <Loader color="#bdbcbc" /> : "Reset Password"}
                        </Button>
                    </Box>
                </GridCol>
                <GridCol span={{ base: 12, md: 6 }} className={style.imgBox}>
                    <Image
                        src={ChanciLogin}
                        alt="ChanciAI"
                        className={style.img}
                        loading="lazy"
                    />
                </GridCol>
            </Grid>
        </form>
    )
}
export default ResetPassword;