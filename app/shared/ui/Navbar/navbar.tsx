import React from "react";
import Logo from "@public/LogoNGN.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbar.module.scss";
import { Button, Group } from "@mantine/core";
import Link from "next/link";

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
    </div>
  );
};

export default Navbar;
