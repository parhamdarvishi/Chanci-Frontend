"use client";
import React, { useState } from "react";
import Logo from "@public/LogoNGN.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbar.module.scss";
import { Button, Card, Drawer, Group, Input } from "@mantine/core";
import Link from "next/link";
import searchIc from "@public/image/search.svg";
import profileIc from "@public/image/icons/profile.svg";
import awardIc from "@public/image/icons/award.svg";
import teacherIc from "@public/image/icons/teacher.svg";
import bubbleR from "@public/image/bubble/right.svg";
import bubbleL from "@public/image/bubble/left.svg";
import logoNav from "@public/image/icons/logoNav.svg";
import loginNav from "@public/image/icons/loginNav.svg";
import { useDisclosure } from "@mantine/hooks";

const Navbar = () => {
  const [loc, setLoc] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const links = [
    "Home",
    "Employers",
    "Candidates",
    "Events",
    "Academy",
    "About us",
  ];

  const handleActiveNav = (index: number) => {
    setLoc(index);
  };

  return (
    <div className={style.container}>
      <Drawer.Root opened={opened} onClose={close} radius={8} size={"310px"}>
        <Drawer.Overlay />
        <Drawer.Content style={{ padding: ".5rem" }}>
          <Drawer.Header>
            <Drawer.Title>
              {" "}
              <Image src={logoNav} alt="header" width={46} height={42} />
            </Drawer.Title>
            <Drawer.CloseButton size={42} color="#585858" />
          </Drawer.Header>
          <Drawer.Body>
            <Image src={loginNav} alt="login" />
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
                    width: "38px",
                    height: "38px",
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
              >
                <Link href={item} onClick={() => handleActiveNav(index)}>
                  {item}{" "}
                </Link>
                {loc === index && <div className={style.line}></div>}
              </li>
            ))}
          </ul>
        </div>
        <Group className={style.btnGroup}>
          <Button className={style.btnLogin}>Log in</Button>
          <Button className={style.btnGet}>Get in Touch</Button>
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
        <Link className={style.btnChanci} href="/find-talent">
          Take me to Chanci AI
        </Link>
        <div className={style.inputBox}>
          <Input
            type="text"
            className={style.input}
            placeholder="Search Jobs"
          />
          <Button variant="outline" className={style.inputBtn}>
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
          <Button variant="filled">Build Your Team</Button>
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
          <Button variant="filled">Start Now</Button>
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
          <Button variant="filled">Explore NGN Events</Button>
        </Card>
      </div>
    </div>
  );
};

export default Navbar;
