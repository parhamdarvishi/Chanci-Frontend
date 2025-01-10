"use client";
import React from "react";
import Logo from "@public/LogoNav.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbarMain.module.scss";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
// import { usePathname } from "next/navigation";

const NavbarMain = () => {
  // const path = usePathname();
  const links = [
    "Home",
    "Employers",
    "Condidates",
    "Events",
    "Academy",
    "About",
  ];

  return (
    <div className={style.wrapper}>
      <ul className={style.navList}>
        <li className={style.menuBar}>
          <Image src={Menu} alt="NGNlogo" />
        </li>
        <li>
          <Image src={Logo} objectFit="cover" alt="NGNlogo" />
        </li>
        {links.map((item, index) => (
          <li
            style={{ marginLeft: "1rem" }}
            className={style.navItems}
            key={index}
          >
            <Link href={item}>{item} </Link>
          </li>
        ))}
      </ul>
      <Group className={style.btnGroup}>
        <Button className={style.btnLogin}>Log in</Button>
        <Button className={style.btnGet}>Get in Touch</Button>
      </Group>
    </div>
  );
};

export default NavbarMain;
