"use client";
import React, {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./footer.module.scss";
import Logo from "@public/LogoNGN.svg";
import Email from "@public/image/smsTracking.svg";
import linkedin from "@public/image/file/SocialMedia.svg";
import footerLine from "@public/image/LineFooter.svg";
import footerLineN from "@public/image/LineFooterN.svg";
import arrowRight from "@public/arrowRight.svg";
import { modals } from "@mantine/modals";
import ModalTouch from "../ModalTouch/modalTouch";
import {postRequest} from "@shared/api";
import {getInTouchAddress} from "@shared/constants/relative-url/getIntouch";
import toastAlert from "@shared/helpers/toast";
import {newsletterSubscriberAddress} from "@shared/constants/relative-url/newsletterSubscriber";

const Footer = () => {

  const [email, setEmail] = useState('');
  
  const handleSubscribe= async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!email || email.length < 1) {
      toastAlert("Please enter valid email!", "error");
      return;
    }
    
    const res = await postRequest(
        newsletterSubscriberAddress.add,
        { email : email },
        false
    );
    if (!res?.isSuccess) {
      toastAlert("Oops! Something went wrong. Please try again later.", "error");
    }
    toastAlert("Thanks for reaching out! We’ll get back to you shortly.", "success");
  };
  
  const openModal = () =>
    modals.open({
      radius: "lg",
      size: "lg",
      title: <strong className={style.modalTitle}>Get in touch</strong>,
      children: <ModalTouch />,
    });
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
          <div className={style.navigationBox}>
            <nav className={style.navigation}>
              <Link href="/Employers">Employers</Link>
              <Link href="/Candidates">Candidates</Link>
              <Link href="/Events">Events</Link>
              <div onClick={openModal}>Get in Touch</div>
            </nav>
            <div className={style.navigationField}>
              <input 
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Sign up for our newsletter" />
              <button className={style.button} onClick={handleSubscribe}>
                Subscribe
                <Image
                  className={style.cardArrow}
                  src={arrowRight}
                  alt="arrowRight"
                  width={22}
                />
              </button>
            </div>
          </div>

          <div className={style.contact}>
            <Link href="mailto:Contact@ukngn.com" className={style.email}>
              <Image src={Email} alt="Email" />
              Contact@ukngn.com
            </Link>

            <div className={style.social}>
              <Link
                href="https://www.linkedin.com/company/new-generation-network/"
                target="_blank"
              >
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
          <p>
            © 2025 New Generation Network-All Rights Reserved.{" "}
            <span style={{ fontSize: "10px" }}>V 1.3</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
