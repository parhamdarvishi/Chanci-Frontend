"use client";
import {getRequest, postRequest} from "@/shared/api";
import {chanciAddresses} from "@/shared/constants/relative-url/chanci";
import {Avatar, Box, Button, Alert, Card} from "@mantine/core";
import {IconMail, IconLock, IconAlertCircle, IconBrandMyOppo, IconChartLine } from "@tabler/icons-react";
import React, {useEffect, useState} from "react";
import Link from "next/link";
import toastAlert from "@/shared/helpers/toast";
import {getUserData} from "@/shared/helpers/util";
import style from "@/(chanci)/style.module.scss";
import {BarChart} from "@mantine/charts";
import {IndustryScore} from "@shared/types/chanci/chanci";
import {IndustryResponse} from "@shared/types/chanci/industry";

type userDataType = {
    userName: string;
    email: string;
};
const Page = () => {
    const [userData, setUserData] = useState<userDataType>();
    const [isVerified, setIsVerified] = useState<boolean>(true);
    const [resendingEmail, setResendingEmail] = useState<boolean>(false);
    const [remainingTime, setRemainingTime] = useState(null);
    const [industryScores, setIndustryScores] = useState<IndustryScore[]>();
    
    const containerStyle = {
        padding: "1rem",
        display: "grid",
        gap: "3rem",
        gridTemplateColumns: "1fr"
    };

    const responsiveStyle = `
      @media (min-width: 768px) {
        .card-container {
          grid-template-columns: repeat(4, 1fr); /* 4 cards per row */
        }
      }
    `;
    
    const getuserProfile = async () => {
        const res = await getRequest(chanciAddresses.profile, null, true);
        if (res?.isSuccess) {
            setUserData(res?.data as userDataType);

            // Check if user is verified from localStorage
            const isUserVerified = getUserData()?.isVerified;// localStorage.getItem('user.isVerified') === 'true';
            setIsVerified(isUserVerified);
        }
    };

    const getLastIndustryScore = async () => {
        const res: IndustryResponse = await getRequest(chanciAddresses.GetLastIndustryScore, null, true);
        if (res?.isSuccess) {
            debugger;
            const result: any =  res?.data?.industryScores;
            setIndustryScores(result);
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
            const finalRes:any = res?.data;
            const paymenturl: any = finalRes?.checkout_Url;
            window.location.href = paymenturl;
        } else {
            return;
        }
    };

    const handleGetExpirationDateOfSubscription = async () => {
        const res = await getRequest(chanciAddresses.GetExpirationDateByUserId, null,true);
        debugger;
        if (res?.data) {
            const finalRes:any = res?.data;
            if (finalRes?.isRemain){
                setRemainingTime(finalRes?.remainingMessage);
            }
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
        getLastIndustryScore();
        handleGetExpirationDateOfSubscription();
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
                className="card-container" style={containerStyle}
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
                            {remainingTime ? (
                                <div style={{fontSize: "16px"}}>{remainingTime}</div>
                            ) : (
                                <button
                                    style={{
                                        color: "#4752f3",
                                        padding: ".2rem 1.2rem",
                                        fontSize: "16px",
                                        borderRadius: "8px",
                                        border: "none",
                                        background: "linear-gradient(90deg,#d4d6ff,#d4d6ff,#f7f8ff)"
                                    }}
                                    onClick={handlePayUserSubscription}>Add Subscription</button>
                            )}
                        </div>
                    </Box>
                </Box>
                <Box style={{}}>
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
                {
                    industryScores && industryScores.length > 0 && (
                        <>
                            <Box style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "1rem",
                            }}>
                                <Avatar color="indigo" size={60}>
                                    <IconChartLine size={40}/>
                                </Avatar>
                                <Box style={{color: "#737373", fontSize: "18px"}}>
                                    Your Last Score
                                </Box>
                            </Box>
                            <Box>
                                <Card
                                    radius="md"
                                    className={style.cardDone}
                                    shadow="none">
                                    <div style={{padding: 10}}>
                                        <BarChart
                                            h={300}
                                            data={industryScores}
                                            dataKey="name"
                                            series={[{name: 'score', color: 'blue'}]}
                                        />
                                    </div>
                                </Card>
                            </Box>
                        </>
                    )
                }
                
            </Box>

            
        </div>
    );
};

export default Page;
