"use client";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain"
import { Card } from "@mantine/core"
import style from "./style.module.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@/shared/config/env";
import toastAlert from "@/shared/helpers/toast";
import Header from "@/shared/ui/Header/header";
import Footer from "@/shared/ui/Footer/footer";
import { useParams } from "next/navigation";
const BootcampPaymentVerify: React.FC = () => {
    const params = useParams();
    const { token } = params;
    const [msg, setMsg] = useState<string>();
    const getVerificationStatus = async () => {
        try {
            const res = await axios.post(
                `${API_BASE_URL}/api/payment/verify`,
                { code: token },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            if (res?.data?.isSuccess && res?.data?.statusCode === 200) {
                toastAlert("Payment Successful", "success");
            }
            else {
                toastAlert("Payment was Unsuccessful", "error");
            }
            setMsg(res?.data?.message);
        } catch (_error) {
            console.log(_error);
            toastAlert("Network Error", "error");
            setMsg("Payment was not successful.");
        }
    }
    useEffect(() => {
        getVerificationStatus();
    }, []);
    return (
        <div>
            <Header />
            <NavbarMain />
            <div className={style.paymentWrapper}>
                <Card shadow="sm" padding="lg" radius="md" withBorder className={style.paymentCard}>
                    <p>{msg}</p>
                </Card>
            </div>
            <Footer />
        </div>
    );
};



export default BootcampPaymentVerify;