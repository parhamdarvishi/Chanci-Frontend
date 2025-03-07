"use client";
import React, { useEffect, useState } from "react";
import Logo from "@public/LogoNav.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbarMain.module.scss";
import { Button, Group, Drawer, Divider, Card, Box } from "@mantine/core";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import ModalTouch from "../ModalTouch/modalTouch";

const NavbarMain = () => {
  const path = usePathname();
  const [opened, { open, close }] = useDisclosure(false);
  const findPath = path.split("/")[1];
  const router = useRouter();
  const [loc, setLoc] = useState(1);
  const links = [
    "Home",
    "Employers",
    "Candidates",
    "Events",
    "Academy",
    "AboutUs",
  ];
  const openModal = () =>
    modals.open({
      radius: "lg",
      size: "lg",
      title: <strong className={style.modalTitle}>Get in touch</strong>,
      children: <ModalTouch />,
    });
  const handleActiveNav = (index: number) => {
    setLoc(index);
  };
  const handleLogin = () => {
    router.push("/ChanciAI/register");
  };
  useEffect(() => {
    if (findPath === "ComingSoon") {
      setLoc(4);
      return;
    }
    links.forEach((element, index) => {
      if (element === findPath) {
        setLoc(index);
      }
    });
  }, []);

  return (
    <div className={style.container}>
      <Drawer.Root opened={opened} onClose={close} radius={8} size={"310px"}>
        <Drawer.Overlay />
        <Drawer.Content style={{ padding: ".5rem" }}>
          <Drawer.Header style={{ marginBottom: ".6rem" }}>
            <Drawer.Title>
              {" "}
              <Image src={Logo} alt="header" width={46} height={42} />
            </Drawer.Title>
            <Drawer.CloseButton size={42} color="#585858" />
          </Drawer.Header>
          <Drawer.Body>
            <Divider color="#efefef" />
            {links.map((item, index) => (
              <Box
                style={{ position: "relative" }}
                key={index}
                onClick={() => handleActiveNav(index)}
              >
                {loc === index && <div className={style.liActive}></div>}

                <Link
                  href={index === 4 ? "/ComingSoon" : `/${item}`}
                  className={
                    loc === index ? style.liSidebarActive : style.liSidebar
                  }
                >
                  <p>{item}</p>
                </Link>
                <Divider color="#efefef" />
              </Box>
            ))}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <div className={style.wrapper}>
        <ul className={style.navList}>
          <li className={style.menuBar}>
            <div onClick={open}>
              <Card
                style={{
                  padding: "0 !important",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={Menu} alt="Menu" className={style.menuBarIm} />
              </Card>
            </div>
          </li>
          <li>
            <Image src={Logo} objectFit="cover" alt="NGNlogo" />
          </li>
          {links.map((item, index) => (
            <li
              style={{ marginLeft: "1rem" }}
              className={loc === index ? style.activeLi : style.navItems}
              key={index}
              onClick={() => handleActiveNav(index)}
            >
              <Link href={index === 4 ? "/ComingSoon" : `/${item}`}>
                {item}{" "}
              </Link>
              {loc === index && <div className={style.line}></div>}
            </li>
          ))}
        </ul>
        <Group className={style.btnGroup}>
          <Button className={style.btnLogin} onClick={handleLogin}>
            Log in
          </Button>
          <Button className={style.btnGet} onClick={openModal}>
            Get in Touch
          </Button>
        </Group>
      </div>
    </div>
  );
};

export default NavbarMain;
