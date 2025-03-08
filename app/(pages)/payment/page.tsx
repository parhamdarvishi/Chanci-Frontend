"use client";
/* eslint-disable  @typescript-eslint/no-explicit-any */
import React, { useState, FormEvent, ChangeEvent } from "react";
import { Box, Card, Input, Button, Text } from "@mantine/core";
import style from "./payment.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import axios from "axios";
import * as yup from "yup";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/shared/config/env";
import toastAlert from "@/shared/helpers/toast";

// Define the form data type
interface FormData {
  fullName: string;
  email: string;
}

// Create a Yup schema for validation
const schema = yup.object({
  fullName: yup.string().min(3, "Full name must be at least 3 characters").required("Full name is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
});

const Payment: React.FC = () => {
  const searchParams = useSearchParams()
  const eventId = searchParams.get('eventid')
  const [formData, setFormData] = useState<FormData>({ fullName: "", email: "" });
  const [errors, setErrors] = useState<{ fullName?: string; email?: string }>({});
  const [loading, setLoading] = useState<boolean>(false);

  // Update form data state on input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Validate using Yup
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate the form data; abortEarly: false collects all errors
      await schema.validate(formData, { abortEarly: false });
    } catch (err: any) {
      if (err.inner) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error: any) => {
          if (error.path) validationErrors[error.path] = error.message;
        });
        setErrors(validationErrors);
      }
      return;
    }

    // Submit form data via Axios if validation passes
    setLoading(true);
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/event/pay`,
        {...formData, id: Number(eventId)},
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
      toastAlert("Network Error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarMain />
      <div className={style.paymentWrapper}>
        <Card shadow="sm" padding="lg" radius="md" withBorder className={style.paymentCard}>
          <p>
            Please enter your full name and email address and click the button to proceed
            with your payment and complete the booking process for participating in the event.
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
                  name="fullName"
                  classNames={{ input: style.input }}
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <Text className={style.description} color="red" size="xs">{errors.fullName}</Text>}
              </Input.Wrapper>
            </Box>

            <Box mt="md">
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                  description: style.description,
                }}
                withAsterisk
                label="Email"
                description="Please enter your email"
              >
                <Input
                  name="email"
                  classNames={{ input: style.input }}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="For e.g. example@gmail.com"
                />
                {errors.email && <Text className={style.description} color="red" size="sm">{errors.email}</Text>}
              </Input.Wrapper>
            </Box>

            <Button type="submit" className={style.button} mt="lg" loading={loading} disabled={!eventId}>
              Pay Now
              {!loading && (
                <Image className={style.cardArrow} src={arrowRight} alt="arrowRight" width={22} />
              )}
            </Button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default Payment;
