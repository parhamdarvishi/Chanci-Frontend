"use client";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import ChanciContainer from "@/shared/ui/ChanciAI/ChanciContainer";
import PsychologyTestSidebar from "@/shared/ui/ChanciAI/PsychologyTestSidebar";
import PsychologyTest from "@/widget/chanciAI/slice/PsychologyTest/psychologyTest";
import React from "react";

const Page = () => {
  const { data, questionIndex } = useChanci();

  return (
    <ChanciContainer SideBar={<PsychologyTestSidebar />} >
      <div style={{ height: "100%" }}>
        <PsychologyTest question={data[questionIndex]} />
      </div>
    </ChanciContainer>
  );
};

export default Page;
