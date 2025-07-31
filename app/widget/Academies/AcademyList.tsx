"use client";
import React, {useEffect, useState} from "react";
import {getRequest} from "@/shared/api";
import AcademyHeader from "@/widget/Academies/Slice/academyHeader/academyHeader";
import style from "@shared/ui/Navbar/navbar.module.scss";
import {Button, Input, Container} from "@mantine/core";
import Image from "next/image";
import searchIc from "@public/image/search.svg";
import textStyle from "./Slice/upcoming/UpComing.module.scss";
import {bootcampAddress} from "@shared/constants/relative-url/bootcamp";
import {bootcamp, BootcampResponse} from "@shared/types/bootcamp/bootcamp";
import BootcampCard from "@/widget/Academies/Slice/BootcampCard/BootcampCard";

const AcademyList = () => {
    const [bootcamps, setBootcamps] = useState<bootcamp[]>([]);
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    const handleComingSoon = () => {

    };

    const allevents = async () => {
        const reqBody = {
            Skip: 0,
            Take: 100,
        };
        const res: BootcampResponse = await getRequest(
            bootcampAddress.GetAll,
            reqBody,
            false
        );
        if (res?.isSuccess) {
            setBootcamps(res.data?.items ?? []);
        }
        return [];
    };
    useEffect(() => {
        allevents();
    }, []);
    return (
        <div>
            <AcademyHeader/>
            <Container>
                {!isMobile ? (
                    <div className={style.container}>
                        <div className={style.NgnBox}>
                            <div className={style.inputBox}>
                                <Input.Wrapper style={{height: "100%"}}>
                                    <Input
                                        type="text"
                                        classNames={{input: style.input}}
                                        placeholder="Search Course"
                                    />
                                </Input.Wrapper>
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
                    </div>
                ) : <></> }
                <div className={textStyle.upcomingHeader}>
                    <h1 style={{fontWeight: "300"}}>
                        <strong
                            style={{borderBottom: "4px solid #5e62fc", borderRadius: "4px"}}
                        >
                            L
                        </strong>
                        <strong>earn Your Way Up</strong>
                    </h1>
                    <p style={{
                        marginTop: "20px"
                    }}>
                        Pick up the skills employers actually care about, from bite-sized intros to deep dives.
                    </p>
                    <p>
                        Browse courses across industries, handpicked to boost your career.
                    </p>
                </div>
                <>
                    {bootcamps.map((bootcamp) => (
                        <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
                    ))}
                </>
            </Container>

        </div>
    );
};

export default AcademyList;
