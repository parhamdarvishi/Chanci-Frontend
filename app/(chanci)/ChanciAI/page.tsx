"use client";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import TestSidebar from "@/shared/ui/ChanciAI/TestSidebar";
import PsychologyTest from "@/widget/chanciAI/slice/PsychologyTest/psychologyTest";
import React from "react";

const Page = () => {
  const { data, questionIndex } = useChanci();

  return (
    <TestSidebar>

      <div style={{ height: "100%" }}>
        <PsychologyTest question={data[questionIndex]} />
      </div>
    </TestSidebar>
  );
};

export default Page;
