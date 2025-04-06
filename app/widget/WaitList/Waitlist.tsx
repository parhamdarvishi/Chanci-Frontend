"use client";
 
 
import React, { useState, FormEvent } from "react";
import { Box, Card, Input, Button, Text } from "@mantine/core";
import style from "./waitlist.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import axios from "axios";
import { API_BASE_URL } from "@/shared/config/env";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";

interface SuccessResponse {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  errors: null;
  data: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    fullName: string;
    email: string;
    universityName: string;
    wishListType: number;
    isDeleted: boolean;
  };
}

const Waitlist: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [successResponse, setSuccessResponse] = useState<SuccessResponse | null>(null);
  const fieldForm = useForm({
    initialValues: {
      fullName: "",
      email: "",
      universityName: "",
    },
    validate: {
      fullName: (value) => (value === "" ? "Please enter your full name" : null),
      email: (value) => (value === "" ? "Please enter your email" : null),
      universityName: (value) => (value === "" ? "Please enter your university name" : null),
    },
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldForm.validate().hasErrors) return;
    // Submit form data via Axios if validation passes
    setLoading(true);
    try {
      const requestData = {
        ...fieldForm.values,
        wishListType: 1,
      };
      
      const res = await axios.post(
        `${API_BASE_URL}/api/WishList/AddRole`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res?.data?.isSuccess && res?.data?.statusCode === 200) {
        toastAlert("Your information has been successfully submitted", "success");
        setSuccessResponse(res.data);
        setSubmitted(true);
        fieldForm.reset();
      } else {
        toastAlert(res?.data?.message as string, "error");
      }
    } catch (_error) {
      console.log(_error);
      toastAlert("Network Error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NavbarMain />
      <div className={style.wishlistWrapper}>
        {submitted && successResponse ? (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.wishlistCard}
          >
            <Text size="lg" fw={600} mb="md" className={style.successTitle}>
              Success!
            </Text>
            <Text mb="md">{successResponse.message}</Text>
            <Text size="sm" c="dimmed">
              Thank you for your interest. We&apos;ll be in touch soon.
            </Text>
          </Card>
        ) : (
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.wishlistCard}
          >
            <Box mb="md">
              <Text component="span">
                <Text component="span" fw={700}>Found it hard to level up your career game? We&apos;ll do it for you.</Text>
                {" "}
                Be among the first{" "}
                <Text component="span" fw={700}>10,000 users to get a free pass to Chanci AI (Already 7,000 signed up)</Text>
                —a one-of-a-kind platform designed to give you personalised career insights and your exclusive{" "}
                <Text component="span" fw={700}>Employability Score</Text>
                {" "}for the job market. Discover tailored recommendations, skill growth tips, and the perfect roles for your unique journey.
              </Text>
              <Text mt="xs">
                Ready to take the next step? Fill out the form, and we will get in touch with you!
              </Text>
            </Box>
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
                  classNames={{ input: style.input }}
                  placeholder="John Doe"
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
                description="Please enter your email address"
              >
                <Input
                  classNames={{ input: style.input }}
                  placeholder="example@gmail.com"
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
                label="University Name"
                description="Please enter your current or last university's name"
              >
                <Input
                  classNames={{ input: style.input }}
                  placeholder="University of Example"
                  {...fieldForm.getInputProps("universityName")}
                />
              </Input.Wrapper>
            </Box>

            <Button
              type="submit"
              className={style.button}
              mt="lg"
              loading={loading}
            >
              Submit
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
        )}
      </div>
    </>
  );
};

export default Waitlist;