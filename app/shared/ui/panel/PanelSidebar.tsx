"use client";
import { Box, Card, Divider } from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import style from "./style/panelSidebar.module.scss";
import logoNav from "@public/image/icons/logoNav.svg";
import Image from "next/image";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import cookie from "@/shared/helpers/cookie";
import { useRouter, usePathname } from "next/navigation";
import { TUserLocal } from "@/shared/types/users/user";
import { getUserIsVolunteer } from "@/shared/helpers/cookie/user";
import { USER_TOKEN, VOLUNTEER } from "@/shared/helpers/cookie/types";
import { clearUserData, getUserData } from "@/shared/helpers/util";
const LogoutButton = () => {
  const router = useRouter();
  const handleSubmit = useCallback(() => {
    if (typeof window !== "undefined") {
      cookie.deleteCookie(USER_TOKEN);
      cookie.deleteCookie(VOLUNTEER);
      clearUserData();
    }
    router.push("/");
  }, [router]);
  return (
    <div onClick={() => handleSubmit()} className={style.progressPartBox}>
      <IconLogout />
      <span style={{ transform: "translateY(3px)" }}>Logout</span>
    </div>
  );
};

const PanelSidebar = ({
  drawer,
  close,
}: {
  drawer: boolean;
  close: () => void;
}) => {
  const volunteer = getUserIsVolunteer();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<TUserLocal | undefined>(undefined);
  const handleSideItem = () => {
    setTimeout(() => {
      close();
    }, 1000);
  };
  
  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
  }, []);
  return (
    <Card shadow="sm" className={style.wrapper}>
      {!drawer && (
        <>
          <Box>
            <Link href="/">
              <Image src={logoNav} alt="ChanciAi" loading="lazy" width={115} />
            </Link>
          </Box>
          <Divider color="#D5D5D7" style={{ margin: "1.6rem 0" }} />
        </>
      )}

      <Box className={style.progressPart}>
        {user?.menus?.map((menu, index) => {
          return (
            <Link
              key={`menu-${index}`}
              href={`${menu.link}`}
              onClick={() => handleSideItem()}
              className={
                pathname === menu.link || pathname.startsWith(`${menu.link}/`)
                  ? style.progressPartBoxActive
                  : style.progressPartBox
              }
            >
              {/* <IconUser /> */}
              <span style={{ transform: "translateY(3px)" }}>{menu.title}</span>
            </Link>
          );
        })}
        <Link
          href="/ComingSoon"
          className={style.progressPartBox}
          onClick={(e) => {
            //avoid hydration fail error in this way
            if (volunteer) {
              e.preventDefault();
              router.push('/ChanciAI');
            }
          }}
        >
          <span style={{ transform: "translateY(3px)" }}>Chanci AI</span>
        </Link>
        <LogoutButton />
      </Box>
    </Card>
  );
};

export default PanelSidebar;
