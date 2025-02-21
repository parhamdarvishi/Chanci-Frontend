"use client";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import PsychologyTest from "@/widget/chanciAI/slice/PsychologyTest/psychologyTest";
import React from "react";

const Page = () => {
  const { data, questionIndex } = useChanci();

  return (
    <div style={{ height: "100%" }}>
      <PsychologyTest question={data[questionIndex]} />
    </div>
  );
};

export default Page;
