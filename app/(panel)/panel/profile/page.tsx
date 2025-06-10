"use client";
import {getRequest, postRequest} from "@/shared/api";
import {chanciAddresses} from "@/shared/constants/relative-url/chanci";
import {Avatar, Box, Button, Alert} from "@mantine/core";
import {IconMail, IconLock, IconAlertCircle, IconBrandMyOppo} from "@tabler/icons-react";
import React, {FormEvent, useEffect, useState} from "react";
import Link from "next/link";
import toastAlert from "@/shared/helpers/toast";
import {getUserData} from "@/shared/helpers/util";
import axios from "axios";
import {API_BASE_URL} from "@shared/config/env";

type userDataType = {
    userName: string;
    email: string;
};
const Page = () => {
    const [userData, setUserData] = useState<userDataType>();
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [resendingEmail, setResendingEmail] = useState<boolean>(false);

    const getuserProfile = async () => {
        const res = await getRequest(chanciAddresses.profile, null, true);
        if (res?.isSuccess) {
            setUserData(res?.data as userDataType);

            // Check if user is verified from localStorage
            const isUserVerified = getUserData()?.isVerified;// localStorage.getItem('user.isVerified') === 'true';
            setIsVerified(isUserVerified);
        }
    };

    const handlePayUserSubscription = async () => {
        const res = await postRequest(chanciAddresses.PayForSubscription,
            {
                SubscriptionId: 1
            },
            true);
        debugger;
        if (res?.data) {
            const finalRes = res?.data;
            const paymenturl = finalRes?.checkout_Url;
            window.location.href = paymenturl;
        } else {
            return;
        }
    };

    const handleResendVerification = async () => {
        setResendingEmail(true);
        try {
            const res = await postRequest('/api/User/ResendVerificationEmail', {}, true);
            if (res?.isSuccess) {
                toastAlert('Verification email has been sent successfully', 'success');
            } else {
                toastAlert(res?.message as string || 'Failed to send verification email', 'error');
            }
        } catch (error) {
            console.error('Error sending verification email:', error);
            toastAlert('Error sending verification email', 'error');
        } finally {
            setResendingEmail(false);
        }
    };

    useEffect(() => {
        getuserProfile();
    }, []);

    return (
        <div>
            {!isVerified && (
                <Alert
                    icon={<IconAlertCircle size="1rem"/>}
                    title="Email not verified"
                    color="yellow"
                    mb="md"
                >
                    Your email is not verified yet. Please verify your email to access all features.
                    <Button
                        variant="filled"
                        color="yellow"
                        onClick={handleResendVerification}
                        loading={resendingEmail}
                        ml="md"
                        size="xs"
                    >
                        Resend verification email
                    </Button>
                </Alert>
            )}

            <Box
                style={{
                    padding: "1rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "3rem",
                }}
            >
                <Box
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        minWidth: "460px",
                    }}
                >
                    <Avatar src={null} alt="no image here" color="indigo" size={60}/>
                    <Box>
                        <div style={{color: "#737373", fontSize: "18px"}}>UserName</div>

                        <div> {userData?.userName}</div>
                    </Box>
                </Box>
                <Box
                    style={{
                        display: "flex",

                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Avatar color="indigo" size={60}>
                        <IconMail size={40}/>
                    </Avatar>
                    <Box>
                        <div style={{color: "#737373", fontSize: "18px"}}>Email</div>
                        <div> {userData?.email}</div>
                    </Box>
                </Box>
                <Box
                    style={{
                        display: "flex",

                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Avatar color="indigo" size={60}>
                        <IconBrandMyOppo size={40}/>
                    </Avatar>
                    <Box>
                        <div style={{color: "#737373", fontSize: "18px"}}>Subscription</div>
                        <div>
                            <button onClick={handlePayUserSubscription}>Add Subscription</button>
                        </div>
                    </Box>
                </Box>
            </Box>

            <Box style={{padding: "1rem", marginTop: "1rem"}}>
                <Link href="/panel/updatepassword">
                    <Box
                        style={{
                            display: "flex",

                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <Avatar color="indigo" size={60}>
                            <IconLock size={40}/>
                        </Avatar>
                        <Box>
                            <div style={{color: "#737373", fontSize: "18px"}}>Update Password</div>
                        </Box>
                    </Box>
                </Link>
            </Box>
        </div>
    );
};

export default Page;
