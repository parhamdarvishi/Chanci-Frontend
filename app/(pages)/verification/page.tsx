"use client";

import { Button, Card } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState, Suspense } from "react";
import { getRequest } from "@/shared/api";
import { authAddresses } from "@/shared/constants/relative-url/auth";
import { useRouter } from "next/navigation";

const VerificationPage = () => {
  const searchParams = useSearchParams();
  const TokenId = searchParams.get("token");
  const router = useRouter();
  const [check, setCheck] = useState(false);

  const approveEmail = async () => {
    const res = await getRequest(authAddresses.VerifyEmail, { TokenId }, false);
    if (res?.isSuccess) {
      setCheck(true);
    }
  };
  const redirectToChanci = () => {
    router.push("/ChanciAI");
  };
  useEffect(() => {
    approveEmail();
  }, []); 

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <h1>Verification Page</h1>
      <p>{search ? `Your token is: ${search}` : "No token provided."}</p> */}
      {check && (
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          style={{
            minWidth: "450px",
            height: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "3rem",
            gap: "3rem",
          }}
        >
          <IconCircleCheck size={130} color="green" />
          <h1 style={{ fontWeight: 400, fontSize: "40px" }}>Email Verified</h1>
          <p
            style={{
              fontSize: "21px",
              maxWidth: "290px",
              textAlign: "center",
              lineHeight: "1.7",
            }}
          >
            Your Email address was successfully Verified.
          </p>
          <Button
            variant="filled"
            type="submit"
            onClick={redirectToChanci}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              borderColor: '#d2d1d2 !important',
              borderRadius: '16px',
              backgroundColor: '#0063f5',
              height: '100px'
              }}
            >
              Continue to Chanci AI
        </Button>
        </Card>
  )
}
    </div >
  );
};

const VerificationPageWrapper = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <VerificationPage />
  </Suspense>
);

export default VerificationPageWrapper;
