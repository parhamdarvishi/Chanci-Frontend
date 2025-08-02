import React, {useEffect, useState} from "react";
import style from "./BootcampCard.module.scss";
import Image from "next/image";
import Link from "next/link";
import {bootcamp} from "@shared/types/bootcamp/bootcamp";

const BootcampCard: React.FC<{ bootcamp: bootcamp }> = ({bootcamp}) => {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    return (
        <>
            {isMobile ? (
                // 👉 Mobile layout
                <div key={bootcamp.id} className={style.bootcampCardItem}>
                    <div className={style.bootcampCardItemImage}>
                        <Image
                            src={bootcamp.cardImagePath || "/image/academy/AcademyCardImage.png"}
                            alt={bootcamp.title}
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={style.bootcampCardItemData}>
                        <h3 className={style.title}>{bootcamp.title}</h3>
                        {/*<span className={style.bootcampBadge}>Get in Touch</span>*/}
                        <div className={style.actionContainer}>
                            <Link href={`/Academy/${bootcamp.id}`}>Learn more</Link>
                        </div>
                    </div>
                </div>
            ) : (
                // 👉 Desktop layout
                <div key={bootcamp.id} className={style.bootcampCardItem}>
                    <div className={style.bootcampCardItemImage}>
                        <Image
                            src={bootcamp.cardImagePath || "/image/academy/AcademyCardImage.png"}
                            alt={bootcamp.title}
                            width={250}
                            height={100}
                        />
                    </div>
                    <div className={style.bootcampCardItemData}>
                        <h3 className={style.title}>{bootcamp.title}</h3>
                        {/*<span className={style.bootcampBadge}>Get in Touch</span>*/}
                        <div className={style.actionContainer}>
                            <Link href={`/Academy/${bootcamp.id}`}>Learn more</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BootcampCard;
