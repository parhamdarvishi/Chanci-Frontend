"use client";
import {
  Box,
  Button,
  Checkbox,
  Grid,
  GridCol,
  Input,
  Loader,
  //   PasswordInput,
} from "@mantine/core";
import React, { useState } from "react";
import ChanciLogin from "@public/image/chanciAI/login.png";
import Image from "next/image";
import Title from "@public/image/widget/Frame.svg";
import avatars from "@public/image/chanciAI/avatars.svg";
import google from "@public/image/chanciAI/icon/google.svg";
import style from "./login.module.scss";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";
import toastAlert from "@/shared/helpers/toast";
import { postRequest } from "@/shared/api";
import { authAddresses } from "@/shared/constants/relative-url/auth";

const Register = () => {
  const { push } = useRouter();

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

  console.log(fieldForm.values);

  const handleChanci = () => {
    push("/ChanciAI/login");
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldForm.validate().hasErrors) return;
    setLoading(true);

    const res = await postRequest(
      authAddresses.register,
      fieldForm.values,
      false
    );

    if (!res?.isSuccess) {
      toastAlert(res?.message as string, "error");
      setLoading(false);
      return;
    }
    setLoading(false);
    toastAlert(res?.message as string, "success");
    handleChanci();

    // Cookie.setCookie(USER_TOKEN , undefined , )
  };

  return (
    <form onSubmit={handleRegister}>
      <Grid className={style.wrapper}>
        <GridCol span={6} className={style.loginDesc}>
          <Box
            className={style.loginHeader}
            style={{ gap: ".7rem !important" }}
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
          <Box className={style.form} style={{ gap: ".6rem" }}>
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
                <Input
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
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <p
                style={{ color: "#0063f5", cursor: "pointer" }}
                onClick={handleChanci}
              >
                Already Sign In?
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
        <GridCol span={6} className={style.imgBox}>
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
