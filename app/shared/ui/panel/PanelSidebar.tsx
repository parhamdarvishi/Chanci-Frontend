"use client";
import { Box, Card, Divider } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import style from "./style/panelSidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import cookie from "@/shared/helpers/cookie";
import { useRouter } from "next/navigation";
import { UserMenu } from "@/shared/types/users/user";
const LogoutButton = () => {
  const router = useRouter();
  const handleSubmit = useCallback(() => {
    if (typeof window !== "undefined") {
      cookie.deleteCookie("USER_TOKEN");
      localStorage.removeItem("userMenu"); // Remove localStorage item
    }
    router.push("/");
  }, [router]);
  return (
    <div onClick={() => handleSubmit()} className={style.progressPartBox}>
      <IconLogout />
      <span style={{ transform: "translateY(3px)" }}>Logout</span>
    </div>
  )
}

const PanelSidebar = () => {
  const [userMenu, setUserMenu] = useState<Array<UserMenu>>([]);
  useEffect(()=>{
    if(typeof window !== 'undefined'){
      setUserMenu(JSON.parse(localStorage.getItem("userMenu") || "[]"));
    }
  }, []);
  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      <Box>
        <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
      </Box>
      <Divider color="#D5D5D7" style={{ margin: "1.6rem 0" }} />

      <Box className={style.progressPart}>
        {userMenu?.map((menu, index) => {
          return (

            <Link key={`menu-${index}`} href={`${menu.link}`} className={style.progressPartBox}>
              {/* <IconUser /> */}
              <span style={{ transform: "translateY(3px)" }}>{menu.title}</span>
            </Link>
          )
        })}
        <LogoutButton />
      </Box>
    </Card>
  );
};

export default PanelSidebar;
