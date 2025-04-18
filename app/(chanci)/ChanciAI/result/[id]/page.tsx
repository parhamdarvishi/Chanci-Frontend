"use client";
import { Card } from "@mantine/core";
import React, { useEffect, useState } from "react";
import style from "../../../style.module.scss";
import TestSidebar from "@/shared/ui/ChanciAI/TestSidebar";
import { useRouter, useParams } from "next/navigation";
import { getRequest } from "@/shared/api";
import toastAlert from "@/shared/helpers/toast";

const Page = () => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  
  // Function to animate progress from current to target over specified duration
  const animateProgress = (targetProgress: number, durationMs: number) => {
    return new Promise((resolve) => {
      const startProgress = progress;
      const startTime = Date.now();
      const endTime = startTime + durationMs;
      
      const updateProgress = () => {
        const now = Date.now();
        if (now >= endTime) {
          setProgress(targetProgress);
          resolve(void 0);
          return;
        }
        
        const elapsed = now - startTime;
        const progressDelta = targetProgress - startProgress;
        const newProgress = startProgress + (progressDelta * elapsed / durationMs);
        setProgress(Math.min(newProgress, targetProgress));
        requestAnimationFrame(updateProgress);
      };
      
      requestAnimationFrame(updateProgress);
    });
  };
  
  const handleExploreClick = async () => {
    setLoading(true);
    setProgress(0); // Reset progress to ensure animation starts from 0
    
    // First animate to 50% over 2 seconds
    animateProgress(50, 2000);
    
    // Then animate to 100% over 0.5 seconds
    
    
    const reqBody = {
      UserAnswerHeaderId: Number(params.id)
    };
    const res = await getRequest(
      "/api/UserAnswers/ConvertAnswersToPromptCommand",
      reqBody,
      true
    );
    
    if (res?.isSuccess) {
      await animateProgress(100, 500);
      // Refresh the data
      router.push(`/ChanciAI/result/${params.id}/detail`);
    } else {
      setLoading(false);
      toastAlert(res?.message as string || "Failed to regenerate result", "error");
    }
  };

  return (
    <TestSidebar>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", alignItems: 'center' }}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardDone}
        >
          <h3>Thank you for completing the test! 🎉</h3>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Based on your responses, we&apos;ve prepared a detailed analysis of
            your personality traits, career preferences, and strengths.
          </p>
          <p style={{ maxWidth: "700px" }}>
            This report is designed to help you gain deeper insights into your
            unique qualities and guide you toward making informed decisions for
            your personal and professional growth.
          </p>
          <span style={{ fontSize: "17px", fontWeight: "600" }}>
            Here&apos;s what you can expect in your results:
          </span>
        </Card>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          withBorder
          className={style.cardDone}
          style={{
            backgroundColor: "#eef1ff",
            display: "flex",
            flexDirection: 'column',
            gap: '0.9rem',
            width: "700px"
          }}
        >
          <h3>Openness to Experience </h3>
          <strong style={{ fontSize: "18px", fontWeight: "500" }}>
            You scored high on openness.
          </strong>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            Youre naturally curious and eager to explore new ideas and
            experiences.
          </li>
          <li style={{ maxWidth: "700px", fontSize: "17px" }}>
            You enjoy creative problem-solving and are enthusiastic about learning
            new things.
          </li>
          <p style={{ maxWidth: "700px", fontSize: "17px" }}>
            Example from your answers: You showed excitement about learning a new
            instrument despite your busy schedule.
          </p>
        </Card>
        {loading && <div className={style.loadingBox}>
          <div className={style.loaderBox}>
            <div className={style.loadingText}>Loading ...</div>
            <div className={style.progressBar}>
            <div
            className={style.progressIndicator}
            style={{ width: `${progress}%` }}
          />
            </div>
          </div>
        </div>}
        {!loading && <div className={style.chanciPlusBox}>
          <button
            className={style.button}
            onClick={handleExploreClick}
            style={{ position: "relative", top: "10px" }}
            disabled={loading}
          >
            <>
              Explore Chanci AI Plus
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </>
          </button>
        </div>}
      </div>
    </TestSidebar >
  );
};

export default Page;
