import React from "react";
import Logo from "@public/LogoNGN.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbar.module.scss";
import { Button, Card, Group, Input } from "@mantine/core";
import Link from "next/link";
import searchIc from "@public/image/search.svg";
import profileIc from "@public/image/icons/profile.svg";
import awardIc from "@public/image/icons/award.svg";
import teacherIc from "@public/image/icons/teacher.svg";

const Navbar = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div>
          <ul className={style.navActions}>
            <li className={style.menuBar}>
              <Link href="/">
                <Image src={Menu} alt="Menu" />
              </Link>
            </li>
            <li>
              <Link href="/">
                <Image src={Logo} alt="NGNlogo" />
              </Link>
            </li>
          </ul>
          <ul className={style.navList}>
            <li>
              <Link href="/Home">Home</Link>
            </li>
            <li>
              <Link href="/Employers">Employers</Link>
            </li>
            <li>
              <Link href="/Condidates">Condidates</Link>
            </li>
            <li>
              <Link href="/Events">Events</Link>
            </li>
            <li>
              <Link href="/Academy">Academy</Link>
            </li>
            <li>
              <Link href="/About">About us</Link>
            </li>
          </ul>
        </div>
        <Group className={style.btnGroup}>
          <Button className={style.btnLogin}>Log in</Button>
          <Button className={style.btnGet}>Get in Touch</Button>
        </Group>
      </div>
      <div className={style.NgnBox}>
        <h1>New Generation Network </h1>
        <p>
          We deliver Chanci AI to the next generation of talents by combining
          advanced analytics, psychological assessments, and updated job market
          data.
        </p>
        <Button className={style.btnChanci}>Take me to Chanci AI</Button>
        <div className={style.inputBox}>
          <Input type="text" className={style.input} />
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
            <Image src={awardIc} alt="search" />
            <h4>Employers</h4>
          </div>
          <p>You’re a company looking for top talents?</p>
          <Button variant="filled">Build Your Team</Button>
        </Card>
      </div>
    </div>
  );
};

export default Navbar;
