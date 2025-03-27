"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import style from "./slider.module.scss";
import { SlideData } from "@/widget/Candidates/model";
import arrowSlide from "@public/image/icons/arrowSlide.svg";
import Link from "next/link";
import useIsMobile from "@/shared/hooks";

interface props {
  slides: SlideData[];
}

const Slider = ({ slides }: props) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();
  const cardsToShow = 3;
  const [cardWidth, setCardWidth] = useState<number>(355); // Width of each card
  const [cardGap, setCardGap] =  useState<number>(32); // Gap between cards (2rem = 32px)

  const nextSlide = () => {
    if (isAnimating || currentIndex >= slides.length - cardsToShow) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevSlide = () => {
    if (isAnimating || currentIndex === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  };

  // const visibleCards = slides.slice(currentIndex, currentIndex + cardsToShow);
  const hasMoreCards = currentIndex < slides.length - cardsToShow;
  const hasPrevCards = currentIndex > 0;
  useEffect(()=>{
    if(isMobile){
      setCardGap(10);
      setCardWidth(180);
    }
  }, [isMobile])
  return (
    <div className={style.wrapper}>
      <div className={style.slider}>
        <div
          className={`${style.cardsContainer} ${isAnimating ? style.animating : ""
            }`}
          style={{
            transform: `translateX(calc(-${currentIndex * (cardWidth + cardGap)
              }px))`,
          }}
        >
          {slides.map((slide) => (
            <div
              onClick={() => window.open(slide.link, "_blank", "noopener,noreferrer")}
              key={slide.id}
              className={style.card}
              style={{ width: `${cardWidth}px` }}
            >
              <div className={style.imageWrapper}>
                <Image
                  src={slide.bannerImagePath}
                  alt={slide.title}
                  width={1000}
                  height={300}
                  className={style.image}
                />
              </div>
              <Link href={slide.link} target="_blank"
                rel="noopener noreferrer" className={style.readMore}>
                {" "}
                Read More
                <Image src={arrowSlide} alt="arrowSlide" />
              </Link>

            </div>
          ))}
        </div>
      </div>

      {hasPrevCards && (
        <button
          className={`${style.arrow} ${style.prev}`}
          onClick={prevSlide}
          disabled={isAnimating}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      )}

      {hasMoreCards && (
        <button
          className={`${style.arrow} ${style.next}`}
          onClick={nextSlide}
          disabled={isAnimating}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      )}

      {/* <div className={style.seeMore}>
        <button>
          See More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default Slider;
