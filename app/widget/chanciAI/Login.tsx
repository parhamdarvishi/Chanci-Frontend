"use client";
import {
  Box,
  Button,
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
import { API_BASE_URL } from "@/shared/config/env";
import { useForm } from "@mantine/form";
import { authAddresses } from "@/shared/constants/relative-url/auth";
import toastAlert from "@/shared/helpers/toast";
import cookie from "@/shared/helpers/cookie";
import { USER_TOKEN, VOLUNTEER } from "@/shared/helpers/cookie/types";
import Link from "next/link";
import { modals } from "@mantine/modals";
import { postRequest } from "@/shared/api";
import axios from "axios";

const ForgetPasswordModal = () => {
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Please enter a valid email'),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.validate().hasErrors) return;

    setLoading(true);
    try {

      const response = await postRequest(
        '/api/User/SendForgetPasswordLink',
        { Email: form.values.email },
        true
      );

      if (response?.isSuccess) {
        toastAlert('Password reset link has been sent to your email', 'success');
        modals.closeAll();
      } else {
        toastAlert(response?.message as string || 'Failed to send reset link', 'error');
      }
    } catch (error: any) {
      const message = error?.response?.data?.message || 'An error occurred while sending reset link';
      toastAlert(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <div className={style.loginDesc}>
        <p>Enter your email address and we’ll send you a link to reset your password.</p>
        <form style={{ padding: '1rem' }} onSubmit={handleSubmit}>
          <Box className={style.form} style={{ padding: '10px 0' }}>
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
                  {...form.getInputProps('email')}
                />
              </Input.Wrapper>
            </Box>
            <Button
              variant="filled"
              type="submit"
              className={loading ? style.submitBtn : style.submitBtnActive}
              disabled={loading}
              style={{ marginTop: '20px' }}
            >
              {loading ? <Loader color="#bdbcbc" /> : "Send Reset Link"}
            </Button>
          </Box>
        </form>
      </div>
    </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isVolunteer, setIsVolunteer] = useState(false);

  const fieldForm = useForm({
    initialValues: {
      password: "",
      username: "",
    },
    validate: {
      password: (value) => (value === "" ? "please field the password" : null),
      username: (value) => (value === "" ? "please field the email" : null),
    },
  });

  const handleChanci = () => {
    router.push("/ChanciAI");
    /* if (isVolunteer) {
      router.push("/ChanciAI");
    } else {
      router.push("/panel/profile");
    } */
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (fieldForm.validate().hasErrors) return;
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}${authAddresses.login}`,
        fieldForm.values,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      cookie.setCookie(USER_TOKEN, JSON.stringify(res?.data?.data?.token));
      // TODO: for testing ChanciAI
      cookie.setCookie(VOLUNTEER, JSON.stringify(res?.data?.data?.isVolunteer));
      setIsVolunteer(res?.data?.data?.isVolunteer);
      localStorage.setItem("userName", JSON.stringify(res?.data?.data?.userName))
      localStorage.setItem(
        "userMenu",
        JSON.stringify(res?.data?.data?.menus) || "[]"
      );
      setLoading(false);
      handleChanci();
    } catch (error: any) {
      const message = error?.response?.data?.message;
      toastAlert(message as string, "error");
      setLoading(false);
      return;
    }
  };

  return (
    <form onSubmit={handleLogin}>
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
                Join for free and see your result
              </h2>
            </Box>
          </Box>
          <Box className={style.dividerBox}>
            <div className={style.divider}></div>
            <span>or</span>
            <div className={style.divider}></div>
          </Box>
          <Box className={style.form}>
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
                  {...fieldForm.getInputProps("username")}
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
            <p style={{ color: "#0063f5", cursor: "pointer", userSelect: "none" }} onClick={() => {
              modals.open({
                radius: "lg",
                size: "lg",
                title: <strong className={style.modalTitle}>Forget Password</strong>,
                children: <ForgetPasswordModal />,
              });
            }}>Forgot your password?</p>
            <Button
              variant="filled"
              type="submit"
              className={loading ? style.submitBtn : style.submitBtnActive}
              disabled={loading}
            >
              {loading ? <Loader color="#bdbcbc" /> : "Sign In"}
            </Button>
            <span>Need an account? <Link style={{ color: "#0063f5", cursor: "pointer", userSelect: "none" }} href={'/user/register'}>SIGN UP</Link></span>
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

export default Login;
