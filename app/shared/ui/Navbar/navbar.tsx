"use client";
import React, { useEffect, useState } from "react";
import Logo from "@public/LogoNGN.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbar.module.scss";
import {
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  Group,
  Input,
} from "@mantine/core";
import Link from "next/link";
import searchIc from "@public/image/search.svg";
import profileIc from "@public/image/icons/profile.svg";
import awardIc from "@public/image/icons/award.svg";
import teacherIc from "@public/image/icons/teacher.svg";
import bubbleR from "@public/image/bubble/right.svg";
import bubbleL from "@public/image/bubble/left.svg";
import logoNav from "@public/image/icons/logoNav.svg";
import { useDisclosure } from "@mantine/hooks";
import { usePathname, useRouter } from "next/navigation";
import { modals } from "@mantine/modals";
import ModalTouch from "../ModalTouch/modalTouch";
import { USER_TOKEN } from "@/shared/helpers/cookie/types";
import cookie from "@shared/helpers/cookie";
import { getUserIsVolunteer } from "@shared/helpers/cookie/user";

const Navbar = () => {
  const [loc, setLoc] = useState(0);
  const [access, setAccess] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const volunteer = getUserIsVolunteer();
  const path = usePathname();

  const router = useRouter();

  const handleLogin = () => {
    if (Token) {
      router.push("/panel/profile");
      return;
    }
    router.push("/user/register");
  };

  const handleComingSoon = () => {
    router.push("/ComingSoon");
  };

  const findPath = path.split("/")[1];
  const links = [
    "Home",
    "Employers",
    "Candidates",
    "Events",
    "Academy",
    "AboutUs",
  ];

  //checkUserToken
  const Token = cookie?.getCookie(USER_TOKEN);

  const handleActiveNav = (index: number) => {
    setLoc(index);
  };
  const openModal = () =>
    modals.open({
      radius: "lg",
      size: "lg",
      title: <strong className={style.modalTitle}>Get in touch</strong>,
      children: <ModalTouch />,
    });

  const handleChanci = () => {
    if (volunteer) {
      if (Token) {
        router.push("/ChanciAI");
        return;
      } else {
        router.push("/user/register");
      }
    } else {
      //handleComingSoon();
      router.push("/waitlist");
    }
  };

  //UseEffect
  useEffect(() => {
    if (Token) {
      setAccess(true);
    }
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
              <Image src={logoNav} alt="header" width={46} height={42} />
            </Drawer.Title>
            <Drawer.CloseButton size={42} color="#585858" />
          </Drawer.Header>
          <Drawer.Body>
            <Divider />
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
                <Divider />
              </Box>
            ))}
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>
      <div className={style.wrapper}>
        <div>
          <ul className={style.navActions}>
            <li className={style.menuBar}>
              <div onClick={open}>
                <Card
                  style={{
                    width: "45px",
                    height: "40px",
                    padding: "0 !important",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image src={Menu} alt="Menu" />
                </Card>
              </div>
            </li>
            <li>
              <Link href="/">
                <Image src={Logo} alt="NGNlogo" />
              </Link>
            </li>
          </ul>
          <ul className={style.navList}>
            {links?.map((item, index) => (
              <li
                key={index}
                className={loc === index ? style.activeLi : style.li}
                onClick={() => handleActiveNav(index)}
              >
                <Link href={index === 4 ? "/ComingSoon" : `/${item}`}>
                  {item}{" "}
                </Link>
                {loc === index && <div className={style.line}></div>}
              </li>
            ))}
          </ul>
        </div>
        <Group className={style.btnGroup}>
          <Button className={style.btnLogin} onClick={handleLogin}>
            {access ? "Panel" : "Log in"}
          </Button>
          <Button className={style.btnGet} onClick={openModal}>
            Get in Touch
          </Button>
        </Group>
      </div>
      <div className={style.NgnBox}>
        <div className={style.bubbleR}>
          <Image src={bubbleR} alt="bubbleR" />
        </div>
        <h1>New Generation Network </h1>
        <p>
          Get your employability score and personal career progress plan for +20
          industries here
        </p>
        <div className={style.bubbleL}>
          <Image src={bubbleL} alt="bubbleR" />
        </div>
        <div className={style.takeMeBtn}>
          {/* <div className={style.comingSoon}>
            <span>Coming Soon!</span>
          </div> */}
          {/* <Link className={style.btnChanci} href="/find-talent">
            Take me to Chanci AI
          </Link> */}
          <Box className={style.btnChanci} onClick={handleChanci}>
            <p style={{ cursor: "pointer", fontSize: "19px" }}>
              Take me to Chanci AI
            </p>
          </Box>
        </div>

        <div className={style.inputBox}>
          {/* <div className={style.comingSoon}>
            <span>Coming Soon!</span>
          </div> */}
          <Input
            type="text"
            className={style.input}
            placeholder="Search Jobs"
          />
          <Button
            variant="outline"
            className={style.inputBtn}
            onClick={handleComingSoon}
          >
            Advanced Search
          </Button>
          <Image
            src={searchIc}
            alt="searchIcon"
            className={style.inputIc}
          ></Image>
        </div>
      </div>
      <div className={style.cardWrapper}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardBox}
        >
          <div className={style.cardHeader}>
            <Image src={profileIc} alt="search" />
            <h4>Employers</h4>
          </div>
          <p>You’re a company looking for top talents?</p>
          <Link href="/Employers">
            <Button variant="filled" style={{ width: "100%" }}>
              Build Your Team
            </Button>
          </Link>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardBox}
        >
          <div className={style.cardHeader}>
            <Image src={teacherIc} alt="search" />
            <h4>Candidates</h4>
          </div>
          <p>Ready to apply for a role that fits your ambitions?</p>
          <Link href="/Candidates">
            <Button variant="filled" style={{ width: "100%" }}>
              Start Now
            </Button>
          </Link>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardBox}
        >
          <div className={style.cardHeader}>
            <Image src={awardIc} alt="search" />
            <h4>NGN Events</h4>
          </div>
          <p>Looking to build your professional network?</p>
          <Link href="/Events">
            <Button variant="filled" style={{ width: "100%" }}>
              Explore NGN Events
            </Button>
          </Link>
        </Card>
      </div>
    </div>
  );
};

export default Navbar;
