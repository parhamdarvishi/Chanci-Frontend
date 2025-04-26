"use client";
 
 
import React, { useState, FormEvent, useEffect } from "react";
import { Box, Card, Input, Button, Select } from "@mantine/core";
import style from "./payment.module.scss";
import NavbarMain from "@/shared/ui/NavbarMain/navbarMain";
import Image from "next/image";
import arrowRight from "@public/arrowRight.svg";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from "@/shared/config/env";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";

import { Event, EventsResponse } from "@/shared/types/events/event";
import { getRequest } from "@/shared/api";
import { eventAddresses } from "@/shared/constants/relative-url/event";
const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 0, // Omit fractional digits
    maximumFractionDigits: 0, // Omit fractional digits
  }).format(amount / 100); // Divide by 100 here
};
const Payment: React.FC = () => {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventid");
  const [event, setEvent] = useState<Event>();
  const [loading, setLoading] = useState<boolean>(false);
  const fieldForm = useForm({
    initialValues: {
      fullName: "",
      email: "",
      linkedInProfile: "",
      eventPaymentTypeId: null as number | null,
    },
    validate: {
      fullName: (value) => (value === "" ? "Please field the fullName" : null),
      email: (value) => (value === "" ? "Please field the email" : null),
      linkedInProfile: (value) => (value === "" ? "Please enter your LinkedIn profile" : null),
      eventPaymentTypeId: (value) =>
        value === null ? "Please choose an option" : null,
    },
    transformValues: (values) => ({
      eventPaymentTypeId: values.eventPaymentTypeId
        ? Number(values.eventPaymentTypeId)
        : null,
    }),
  });

  // Validate using Yup
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fieldForm.validate().hasErrors) return;
    // Submit form data via Axios if validation passes
    setLoading(true);
    try {
      fieldForm.values.eventPaymentTypeId = Number(
        fieldForm.values.eventPaymentTypeId
      );
      const res = await axios.post(
        `${API_BASE_URL}/api/event/pay`,
        { ...fieldForm.values, id: Number(eventId) },
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
      console.log(_error);
      toastAlert("Network Error", "error");
    } finally {
      setLoading(false);
    }
  };
  const eventFetch = async () => {
    const reqBody = {
      Id: eventId,
      Skip: 0,
      Take: 1,
    };
    const res: EventsResponse = await getRequest(
      eventAddresses.GetbyId,
      reqBody,
      false
    );
    if (res?.isSuccess) {
      setEvent(res.data?.items[0]);
    }
    return [];
  };
  useEffect(() => {
    eventFetch();
  }, []);
  return (
    <>
      <NavbarMain />
      <div className={style.paymentWrapper}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.paymentCard}
        >
          <p>
            Please enter your full name, email address, and LinkedIn profile and click the button
            to proceed with your payment and complete the booking process for
            participating in the event.
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
                  classNames={{ input: style.input }}
                  placeholder="For e.g. example@gmail.com"
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
              >
                <Input
                  classNames={{ input: style.input }}
                  placeholder="For e.g. example@gmail.com"
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
                label="LinkedIn Profile"
              >
                <Input
                  classNames={{ input: style.input }}
                  placeholder="e.g. https://linkedin.com/in/yourprofile"
                  {...fieldForm.getInputProps("linkedInProfile")}
                />
              </Input.Wrapper>
              <Input.Wrapper
                classNames={{
                  root: style.root,
                  label: style.label,
                  description: style.description,
                }}
                label="Type"
              >
                <Select
                  checkIconPosition="right"
                  data={event?.eventPaymentTypes.map((paymentType) => ({
                    value: paymentType.id.toString(),
                    label: `${paymentType.title} - ${
                      paymentType.currency === "GBP"
                        ? `${formatCurrency(paymentType.amount)}`
                        : paymentType.amount
                    }`,
                  }))}
                  classNames={{
                    input: style.input,
                    label: style.label,
                    error: style.errorMessages,
                  }}
                  //   dropdownOpened
                  placeholder="Choose a payment type"
                  {...fieldForm.getInputProps("eventPaymentTypeId")}
                />
              </Input.Wrapper>
            </Box>

            <Button
              type="submit"
              className={style.button}
              mt="lg"
              loading={loading}
              disabled={!eventId}
            >
              Pay Now
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
      </div>
    </>
  );
};

export default Payment;
