"use client";
import { Box, Button, Input, Select, Textarea } from "@mantine/core";
import React, { useState } from "react";
import style from "./modalTouch.module.scss";
import { useForm } from "@mantine/form";
import { postRequest } from "@/shared/api";
import { getInTouchAddress } from "@/shared/constants/relative-url/getIntouch";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";

const ModalTouch = () => {
  const [loading, setLoading] = useState(false);
  const fieldForm = useForm({
    initialValues: {
      inquirySubject: "",
      fullName: "",
      email: "",
      phoneNumber: "",
      message: "",
    },
    validate: {
      inquirySubject: (value) =>
        value === "" ? "please field the inquirySubject" : null,
      fullName: (value) => (value === "" ? "please field the fullName" : null),
      email: (value) => (value === "" ? "please field the email" : null),
      phoneNumber: (value) =>
        value === "" ? "please field the phoneNumber" : null,
      message: (value) => (value === "" ? "please field the message" : null),
    },
  });

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    debugger;
    if (fieldForm.validate().hasErrors) return;
    setLoading(true);
    const res = await postRequest(
      getInTouchAddress.add,
      fieldForm.values,
      false
    );
    if (!res?.isSuccess) {
      setLoading(false);
      toastAlert("Oops! Something went wrong. Please try again later.", "error");
    }
    toastAlert("Thanks for reaching out! We’ll get back to you shortly.", "success");
    modals.closeAll();
    setLoading(false);
  };
  return (
    <form onSubmit={handleLogin} className={style.modalBox}>
      <Box>
        <Select
          checkIconPosition="right"
          data={[
            "Ambassor",
            "General Inquiry",
            "Chanci AI",
            "Events Sponsor Application",
            "Start up Consult",
            "Post a Job with Us",
          ]}
          classNames={{
            label: style.labelSelect,
            description: style.description,
            input: style.inputInquiry,
          }}
          defaultSearchValue="General Inquiry"
          label="Inquiry Subject"
          placeholder="Please enter your inquiry subject"
          defaultValue="React"
          {...fieldForm.getInputProps("inquirySubject")}
        />
      </Box>
      <Box>
        <Input.Wrapper
          classNames={{
            root: style.root,
            label: style.label,
            description: style.description,
          }}
          withAsterisk
          label="full name"
        >
          <Input
              placeholder="Please enter your full name"
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
            description: style.description,
          }}
          withAsterisk
          label="Email"
        >
          <Input
            placeholder="Please enter your email"
            classNames={{ input: style.input }}
            {...fieldForm.getInputProps("email")}
          />
        </Input.Wrapper>
      </Box>
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Input.Wrapper
          classNames={{
            root: style.root,
            label: style.label,
            description: style.description,
          }}
          withAsterisk
          label="Phone Number"
        >
          <Input
            placeholder="Please enter your mobile number"
            classNames={{ input: style.input }}
            {...fieldForm.getInputProps("phoneNumber")}
          />
        </Input.Wrapper>
      </Box>
      <Box>
        <Textarea
          variant="filled"
          classNames={{
            label: style.label,
            description: style.description,
            input: style.inputTextArea,
          }}
          label="Your Message"
          placeholder="Please enter your message (Optional)"
          minRows={6}
          {...fieldForm.getInputProps("message")}
        />
      </Box>
      <Button type="submit" className={style.button} disabled={loading}>
        {loading ? "waiting ..." : "Submit"}
      </Button>
    </form>
  );
};

export default ModalTouch;
