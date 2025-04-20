"use client";
import React from 'react';
import { Box, Card, Center, Divider, Loader } from '@mantine/core';
import style from './style/sidebar.module.scss';
import Image from 'next/image';
import Title from '@public/image/widget/Frame.svg';
import Link from 'next/link';
import { keyToLetter } from '@/shared/helpers';
import { CvAnalysisSectionFlags } from '@/shared/types/chanci/result';

interface DynamicSidebarProps {
  sections: CvAnalysisSectionFlags | undefined;
  activeSection: string;
  onSectionChange: (section: string) => void;
  drawer?: boolean;
}

const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  sections,
  activeSection,
  onSectionChange,
  drawer = false
}) => {
  // Define sections based on the ConvertAnswersToPromptResponse structure
  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
  };
  const LoadingSpinet = () => {
    return (
        <Center style={{ height: "100vh" }}>
            <Loader color="blue" size="lg" />
        </Center>
    );
};
  

  return (
    <Card shadow="sm" padding="lg" className={style.wrapper}>
      {!drawer && (
        <>
          <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Link href="/Home">
              <Image src={Title} alt="ChanciAi" loading="lazy" width={115} />
            </Link>
          </Box>
          <Divider color="#D5D5D7" style={{ margin: "1.8rem 0" }} />
        </>
      )}

      <Box>
        <h4
          style={{
            marginBottom: ".8rem",
            fontWeight: "400",
            color: "#9F9F9F",
            margin: ".6rem 0",
          }}
        >
          Result Sections
        </h4>
        <div style={{ color: "#08CD6A", marginBottom: "1rem" }}>
          Click on each section to view details
        </div>

        <Box className={style.progressPart}>
          {sections ? Object.entries(sections).filter(([keyObj, value]) => (value == true /* || keyObj === "JobIndustryMatrix" */))
              .map(([key]) => (
            <div
              key={key}
              className={
                activeSection === key
                  ? style.progressPartActive
                  : style.progressPartBox
              }
              onClick={() => handleSectionClick(key)}
            >
              <span>{keyToLetter(key)}</span>
            </div>
          ) ) : (<LoadingSpinet />) }
        </Box>
      </Box>
    </Card>
  );
};

export default DynamicSidebar;