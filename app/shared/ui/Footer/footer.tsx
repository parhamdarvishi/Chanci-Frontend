import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.scss";
import Logo from "@public/LogoNGN.svg";
import Email from "@public/image/smsTracking.svg";
import linkedin from "@public/image/file/SocialMedia.svg";
import footerLine from "@public/image/LineFooter.svg";
import footerLineN from "@public/image/LineFooterN.svg";

const Footer = () => {
  return (
    <footer className={style.footer}>
      <div className={style.container}>
        <div className={style.content}>
          <div className={style.logoSection}>
            <Link href="/">
              <Image src={Logo} alt="NGN Logo" width={80} height={40} />
            </Link>
            <p className={style.location}>London, UK</p>
          </div>

          <div className={style.contactRes}>
            <Link href="mailto:Contact@ukngn.com" className={style.email}>
              <Image src={Email} alt="Email" />
              Contact@ukngn.com
            </Link>

            <div className={style.socialRes}>
              <Link href="https://linkedin.com" target="_blank">
                <Image src={linkedin} alt="linkedin" height={50} />
              </Link>
            </div>
          </div>
          <nav className={style.navigation}>
            <Link href="/employers">Employers</Link>
            <Link href="/candidates">Candidates</Link>
            <Link href="/events">Events</Link>
            <Link href="/contact">Get in Touch</Link>
          </nav>

          <div className={style.contact}>
            <Link href="mailto:Contact@ukngn.com" className={style.email}>
              <Image src={Email} alt="Email" />
              Contact@ukngn.com
            </Link>

            <div className={style.social}>
              <Link href="https://linkedin.com" target="_blank">
                <Image src={linkedin} alt="linkedin" height={50} />
              </Link>
            </div>
          </div>
        </div>

        <div className={style.copyright}>
          <div className={style.copyrightLineRes}>
            <Image alt="footerLine" src={footerLine} />
          </div>
          <div className={style.copyrightLine}>
            <Image alt="footerLine" src={footerLineN} />
          </div>
          <p>CopyRight © 2025 Cube. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
