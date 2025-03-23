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
import axios from "axios";
import { API_BASE_URL } from "@/shared/config/env";
import { useForm } from "@mantine/form";
import { authAddresses } from "@/shared/constants/relative-url/auth";
import toastAlert from "@/shared/helpers/toast";
import cookie from "@/shared/helpers/cookie";
import { USER_TOKEN } from "@/shared/helpers/cookie/types";
import useIsMobile from "@/shared/hooks";

const Login = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem(
        "userMenu",
        JSON.stringify(res?.data?.data?.menus) || "[]"
      );
      setLoading(false);
      handleChanci();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            gap: "2rem",
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
              {/* <Button variant="default" className={style.googleBtn}>
                <Image src={google} alt="ChanciAI" width={25} />
                <span style={{ fontWeight: "400", color: "#585858" }}>
                  Continue with Google
                </span>
              </Button> */}
            </Box>
          </Box>
          <Box className={style.dividerBox}>
            <div className={style.divider}></div>
            <span>or</span>
            <div className={style.divider}></div>
          </Box>
          <Box className={style.form}>
            {/* <Box>
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                }}
                label="Name"
              >
                <Input classNames={{ input: style.input }} />
              </Input.Wrapper>
            </Box> */}
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
            {/* <Box className={style.Checkbox}>
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="I agree to the Terms & Privacy"
              />
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="Share my CV with employers"
              />
              <Checkbox
                classNames={{
                  root: style.root,
                  label: style.labelCheck,
                }}
                label="I want to receive event invitations and job market insights"
              />
            </Box> */}
            <Button
              variant="filled"
              type="submit"
              className={loading ? style.submitBtn : style.submitBtnActive}
              style={{ marginTop: "2rem" }}
              disabled={loading}
            >
              {loading ? <Loader color="#bdbcbc" /> : "Sign In"}
            </Button>
          </Box>
        </GridCol>
        {isMobile !== true && <GridCol span={{ base: 12, md: 6 }} className={style.imgBox}>
          <Image
            src={ChanciLogin}
            alt="ChanciAI"
            className={style.img}
            loading="lazy"
          />
        </GridCol>}
      </Grid>
    </form>
  );
};

export default Login;
