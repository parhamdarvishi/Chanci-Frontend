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
  );
};

const PanelSidebar = ({
  drawer,
  close,
}: {
  drawer: boolean;
  close: () => void;
}) => {
  const [userMenu, setUserMenu] = useState<Array<UserMenu>>([]);
  const [menuIndex, setMenuIndex] = useState(0);

  const handleSideItem = (index: number) => {
    setMenuIndex(index);
    setTimeout(() => {
      close();
    }, 1000);
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserMenu(JSON.parse(localStorage.getItem("userMenu") || "[]"));
    }
  }, []);
  return (
    <Card shadow="sm" className={style.wrapper}>
      {!drawer && (
        <>
          <Box>
            <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
          </Box>
          <Divider color="#D5D5D7" style={{ margin: "1.6rem 0" }} />
        </>
      )}

      <Box className={style.progressPart}>
        {userMenu?.map((menu, index) => {
          return (
            <Link
              key={`menu-${index}`}
              href={`${menu.link}`}
              onClick={() => handleSideItem(index)}
              className={
                menuIndex === index
                  ? style.progressPartBoxActive
                  : style.progressPartBox
              }
            >
              {/* <IconUser /> */}
              <span style={{ transform: "translateY(3px)" }}>{menu.title}</span>
            </Link>
          );
        })}
        <Link href={`/ComingSoon`} className={style.progressPartBox}>
          <span style={{ transform: "translateY(3px)" }}>Chanci AI</span>
        </Link>
        <LogoutButton />
      </Box>
    </Card>
  );
};

export default PanelSidebar;
