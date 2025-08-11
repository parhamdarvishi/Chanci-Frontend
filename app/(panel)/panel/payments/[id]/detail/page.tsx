"use client";
import { getRequest } from "@/shared/api";
import { paymentAddresses } from "@/shared/constants/relative-url/payment";
import { Box, Card, Grid, GridCol, Loader, Text } from "@mantine/core";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type PaymentType = {
  id: number;
  userId: string;
  price: number;
  currency: string;
  paiedSuccessfull: boolean;
  refrenceId: string;
  descripion: string;
  code: string;
  extrenalId: string;
  callback: string;
  createAt: string;
  userPaymentTypeId: number;
  userPaymentType: {
    id: number;
    name: string;
    createAt: string;
  };
  userPaymentLogs: any[];
  email: string  | null;
  entityId: number | null;
};
interface ApiResponse {
    isSuccess?: boolean;
    data?: {
      items?: PaymentType[];
    };
  }

const Page = () => {
  const params = useParams();
  const [payment, setPayment] = useState<PaymentType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPaymentDetail = async () => {
    setLoading(true);
    try {
      const res: ApiResponse = await getRequest(
        paymentAddresses.GetAllPayments,
        { Skip: 0,
          Take: 1,
          "Filters[0].PropertyName": "id",
          "Filters[0].Value": params.id,
         },
        true
      );
      if (res?.isSuccess && res?.data?.items && res?.data?.items?.length > 0) {
        setPayment(res.data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentDetail();
  }, [params.id]);

  if (loading) {
    return (
      <Box style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
        <Loader />
      </Box>
    );
  }

  if (!payment) {
    return (
      <Box style={{ padding: "2rem" }}>
        <Text>Payment not found</Text>
      </Box>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box style={{ padding: "1rem" }}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Text size="xl" fw={500} mb="md">
          Payment Details
        </Text>

        <Grid>
          <GridCol span={6}>
            <Text fw={500}>ID:</Text>
            <Text mb="sm">{payment.id}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>User ID:</Text>
            <Text mb="sm">{payment.userId}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>Email:</Text>
            <Text mb="sm">{payment.email}</Text>
          </GridCol>
          
          <GridCol span={6}>
            <Text fw={500}>Price:</Text>
            <Text mb="sm">{payment.price / 100} {payment.currency || "N/A"}</Text>
          </GridCol>
          
          <GridCol span={6}>
            <Text fw={500}>Payment Status:</Text>
            <Text mb="sm">{payment.paiedSuccessfull ? "Successful" : "Failed"}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>Reference ID:</Text>
            <Text mb="sm">{payment.refrenceId || "N/A"}</Text>
          </GridCol>

          <GridCol span={12}>
            <Text fw={500}>Description:</Text>
            <Text mb="sm">{payment.descripion}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>Code:</Text>
            <Text mb="sm">{payment.code}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>External ID:</Text>
            <Text mb="sm">{payment.extrenalId}</Text>
          </GridCol>

          <GridCol span={12}>
            <Text fw={500}>Callback URL:</Text>
            <Text mb="sm">{payment.callback}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>Created At:</Text>
            <Text mb="sm">{formatDate(payment.createAt)}</Text>
          </GridCol>

          <GridCol span={6}>
            <Text fw={500}>Payment Type:</Text>
            <Text mb="sm">{payment.userPaymentType?.name || "N/A"}</Text>
          </GridCol>
        </Grid>
      </Card>
    </Box>
  );
};

export default Page;