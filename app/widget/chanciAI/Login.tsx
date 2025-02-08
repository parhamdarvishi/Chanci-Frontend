"use client";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridCol,
  Input,
  //   PasswordInput,
} from "@mantine/core";
import React from "react";
import ChanciLogin from "@public/image/chanciAI/login.png";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
import avatars from "@public/image/chanciAI/avatars.svg";
import google from "@public/image/chanciAI/icon/google.svg";
import style from "./login.module.scss";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const handleChanci = () => {
    router.push("/ChanciAI");
  };
  return (
    <div>
      <Grid className={style.wrapper}>
        <GridCol span={6} className={style.loginDesc}>
          <Box className={style.loginHeader}>
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
              <Button variant="default" className={style.googleBtn}>
                <Image src={google} alt="ChanciAI" width={25} />
                <span style={{ fontWeight: "400", color: "#585858" }}>
                  Continue with Google
                </span>
              </Button>
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
                label="Name"
              >
                <Input classNames={{ input: style.input }} />
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
                <Input classNames={{ input: style.input }} />
              </Input.Wrapper>
            </Box>
            <Box className={style.Checkbox}>
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
            </Box>
            <Button
              variant="filled"
              className={style.submitBtn}
              onClick={handleChanci}
            >
              Sign up
            </Button>
          </Box>
        </GridCol>
        <GridCol span={6} className={style.imgBox}>
          <Image
            src={ChanciLogin}
            alt="ChanciAI"
            className={style.img}
            loading="lazy"
          />
        </GridCol>
      </Grid>
    </div>
  );
};

export default Login;
