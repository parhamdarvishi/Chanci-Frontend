import { Box, Card, Divider } from "@mantine/core";
import React from "react";
import style from "./style/panelSidebar.module.scss";
import Title from "@public/image/widget/Frame.svg";
import Image from "next/image";
import { IconLogout } from "@tabler/icons-react";
import Link from "next/link";
import cookie from "@/shared/helpers/cookie";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const router = useRouter();
  const handleSubmit = () => {
    cookie.deleteCookie("USER_TOKEN");
    localStorage.removeItem("userMenu");
    router.push('/');
  }
  return (
    <div onClick={() => handleSubmit()} className={style.progressPartBox}>
      <IconLogout />
      <span style={{ transform: "translateY(3px)" }}>Logout</span>
    </div>
  )
}

const PanelSidebar = () => {
  const userMenu: Array<UserMenu> = JSON.parse(localStorage.getItem("userMenu") || "[]");
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
