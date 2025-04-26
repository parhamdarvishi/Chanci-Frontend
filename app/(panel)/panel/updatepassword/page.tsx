"use client";
import React, { useState } from "react";
import { Box, Button, Container, Group, PasswordInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { postRequest } from "@/shared/api";
import toastAlert from "@/shared/helpers/toast";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);

  const passwordForm = useForm({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validate: {
      oldPassword: (value) => (value === "" ? "Please enter your current password" : null),
      newPassword: (value) => {
        if (value === "") return "Please enter a new password";
        if (value.length < 6) return "Password must be at least 6 characters long";
        return null;
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (passwordForm.validate().hasErrors) return;

    setLoading(true);
    try {
      const res = await postRequest(
        "/api/User/UpdatePasswordInPanel",
        passwordForm.values,
        false
      );

      if (res?.isSuccess) {
        toastAlert("Password updated successfully", "success");
        passwordForm.reset();
      } else {
        toastAlert(res?.message as string || "Failed to update password", "error");
      }
    } catch (error) {
      toastAlert("An error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  const demoProps = {
    h: 50,
    mt: 'md',
  };
  return (
    <Container fluid {...demoProps} style={{width: '100%'}} >
      <Title order={2} mb="lg">
        Reset Password
      </Title>
      <form onSubmit={handleSubmit}>
        <Box mx="auto">
          <PasswordInput
            label="Current Password"
            placeholder="Enter your current password"
            required
            mb="md"
            {...passwordForm.getInputProps("oldPassword")}
          />
          <PasswordInput
            label="New Password"
            placeholder="Enter your new password"
            required
            mb="xl"
            {...passwordForm.getInputProps("newPassword")}
          />
          <Group justify="end">
            <Button type="submit" loading={loading}>
              Update Password
            </Button>
          </Group>
        </Box>
      </form>
    </Container>
  );
};

export default ResetPassword;