"use client";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridCol,
  Input,
  Loader,
  PasswordInput,
} from "@mantine/core";
import React, { useState } from "react";
import ChanciLogin from "@public/image/chanciAI/login.png";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
import avatars from "@public/image/chanciAI/avatars.svg";
import style from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import toastAlert from "@/shared/helpers/toast";
import { postRequest } from "@/shared/api";
import { authAddresses } from "@/shared/constants/relative-url/auth";
import axios from "axios";
import { modals } from "@mantine/modals";
import { ERROR_MESSAGES } from "@/shared/constants/data";
const GuideToLoginModal = () => {
  const router = useRouter();
  const redirectToLogin = () => {
    modals.closeAll();
    router.push("/user/login");
  };

  return (
    <div className={style.wrapper}>
      <div className={style.loginDesc}>
        <p>{ERROR_MESSAGES.ALREADY_SIGNED_UP}</p>
        <div style={{ padding: '1rem' }}>
          <Box className={style.form} style={{ padding: '10px 0' }}>
            <Button
              variant="filled"
              type="submit"
              onClick={redirectToLogin}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                borderColor: '#d2d1d2 !important',
                borderRadius: '16px',
                backgroundColor: '#0063f5',
                height: '48px'
                }}
              >
              Continue to Login
            </Button>
          </Box>
        </div>
      </div>
    </div>
  );
};
const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fieldForm = useForm({
    initialValues: {
      password: "",
      email: "",
      fullName: "",
      isAgreeToTermsAndPrivacy: false,
      shareCVWithEmployers: false,
      recieveInvitationsAndInsights: false,
    },
    validate: {
      password: (value) => (value === "" ? "please field the password" : null),
      email: (value) => (value === "" ? "please field the email" : null),
      fullName: (value) => (value === "" ? "please field the email" : null),
    },
  });

  const handleChanci = () => {
    router.push("/user/login");
  };
  const openLoginModal = () => {
    modals.open({
      radius: "lg",
      size: "lg",
      title: '',
      children: <GuideToLoginModal />,
    });
  };
  
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldForm.validate().hasErrors) return;
    setLoading(true);

    try {
      const res = await postRequest(
        authAddresses.register,
        fieldForm.values,
        false
      );
      if(res.isSuccess){
        setLoading(false);
        toastAlert(res?.message as string, "success");
        handleChanci();
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || "Unknown error";
        if (
          error.response?.status === 400 &&
          message === "You have signed up with this email address, please login to your account."
        ) {
          setLoading(false);
          openLoginModal(); // <- Call your modal logic here
        }
      } else {
        toastAlert("An unexpected error occurred.", "error");
        setLoading(false);
      }
      
    }
    // Cookie.setCookie(USER_TOKEN , undefined , )
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid className={style.wrapper}>
        <GridCol span={{ base: 12, md: 6 }} className={style.loginDesc}>
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
                Join for free and see your result
              </h2>
            </Box>
          </Box>
          <Box className={style.dividerBox}>
            <div className={style.divider}></div>
            <span>or</span>
            <div className={style.divider}></div>
          </Box>
          <Box className={style.form} style={{ gap: "1.2rem" }}>
            <Box>
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                }}
                label="FullName"
              >
                <Input
                  classNames={{ input: style.input }}
                  {...fieldForm.getInputProps("fullName")}
                />
              </Input.Wrapper>
            </Box>
            <Box>
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                }}
                label="Email address"
              >
                <Input
                  classNames={{ input: style.input }}
                  placeholder="example@gmail.com"
                  {...fieldForm.getInputProps("email")}
                />
              </Input.Wrapper>
            </Box>
            <Box>
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                }}
                label="Password"
              >
                <PasswordInput
                  classNames={{ input: style.input }}
                  {...fieldForm.getInputProps("password")}
                />
              </Input.Wrapper>
            </Box>
            <Box className={style.Checkbox} style={{ gap: ".5rem" }}>
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="I agree to the Terms & Privacy"
                {...fieldForm.getInputProps("isAgreeToTermsAndPrivacy")}
              />
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="Share my CV with employers"
                {...fieldForm.getInputProps("shareCVWithEmployers")}
              />
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="I want to receive event invitations and job market insights"
                {...fieldForm.getInputProps("recieveInvitationsAndInsights")}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                gap: ".3rem",
              }}
            >
              <p>Already have an account ? </p>
              <p
                style={{ color: "#0063f5", cursor: "pointer", userSelect: "none" }}
                onClick={handleChanci}
              >
                Log in
              </p>
            </Box>
            <Button
              variant="filled"
              className={loading ? style.submitBtn : style.submitBtnActive}
              type="submit"
              disabled={loading}
              style={{ margin: "0 !important" }}
            >
              {loading ? <Loader /> : "Sign up"}
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
  );
};

export default Register;
