"use client";
import React, { useEffect, useState } from "react";
import Logo from "@public/LogoNav.svg";
import Menu from "@public/menu.svg";
import Image from "next/image";
import style from "./navbarMain.module.scss";
import { Button, Group } from "@mantine/core";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarMain = () => {
  const path = usePathname();

  const findPath = path.split("/")[1];

  const [loc, setLoc] = useState(1);
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

  useEffect(() => {
    links.forEach((element, index) => {
      if (element === findPath) {
        setLoc(index);
      }
    });
  }, []);

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
            className={loc === index ? style.activeLi : style.navItems}
            key={index}
          >
            <Link href={item} onClick={() => handleActiveNav(index)}>
              {item}{" "}
            </Link>
            {loc === index && <div className={style.line}></div>}
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
