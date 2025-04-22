"use client";
import { getRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { Avatar, Box } from "@mantine/core";
import { IconMail, IconLock } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";

type userDataType = {
  userName: string;
  email: string;
};
const Page = () => {
  const [userData, setUserData] = useState<userDataType>();

  const getuserProfile = async () => {
    const res = await getRequest(chanciAddresses.profile, null, true);
    if (res?.isSuccess) {
      setUserData(res?.data as userDataType);
    }
  };
  useEffect(() => {
    getuserProfile();
  }, []);

  return (
    <div>
      <Box
        style={{
          padding: "1rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "3rem",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            minWidth: "460px",
          }}
        >
          <Avatar src={null} alt="no image here" color="indigo" size={60} />
          <Box>
            <div style={{ color: "#737373", fontSize: "18px" }}>UserName</div>

            <div> {userData?.userName}</div>
          </Box>
        </Box>
        <Box
          style={{
            display: "flex",

            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Avatar color="indigo" size={60}>
            <IconMail size={40} />
          </Avatar>
          <Box>
            <div style={{ color: "#737373", fontSize: "18px" }}>Email</div>
            <div> {userData?.email}</div>
          </Box>
        </Box>
      </Box>

      <Box style={{ padding: "1rem", marginTop: "1rem" }}>
        <Link href="/panel/updatepassword">
          <Box
            style={{
              display: "flex",

              alignItems: "center",
              gap: "1rem",
            }}
          >
            <Avatar color="indigo" size={60}>
              <IconLock size={40} />
            </Avatar>
            <Box>
              <div style={{ color: "#737373", fontSize: "18px" }}>Update Password</div>
            </Box>
          </Box>
        </Link>
      </Box>
    </div>
  );
};

export default Page;
