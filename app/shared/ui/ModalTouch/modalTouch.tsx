import { Box, Input, Select, Textarea } from "@mantine/core";
import React from "react";
import style from "./modalTouch.module.scss";
import Link from "next/link";

const ModalTouch = () => {
  return (
    <div className={style.modalBox}>
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
          //   dropdownOpened
          description="Please enter your inquiry subject"
          label="Inquiry Subject"
          placeholder="Pick value"
          defaultValue="React"
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
          label="Full name"
          description="Please enter your full name"
        >
          <Input classNames={{ input: style.input }} />
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
          description="Please enter your email"
        >
          <Input
            placeholder="For e.g. example@gmail.com"
            classNames={{ input: style.input }}
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
          description="Please enter your mobile number"
        >
          <Input
            placeholder="For e.g. 44667788"
            classNames={{ input: style.input }}
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
          description="Please enter your message (Optional)"
          placeholder="Placeholder text"
          minRows={6}
        />
      </Box>
      <Link href="/Employers" className={style.button}>
        Submit
      </Link>
    </div>
  );
};

export default ModalTouch;
