"use client";
import React from 'react';
import { Box, Card, Divider } from '@mantine/core';
import style from './style/sidebar.module.scss';
import Image from 'next/image';
import Title from '@public/image/widget/Frame.svg';
import Link from 'next/link';

interface DynamicSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  drawer?: boolean;
}

const DynamicSidebar: React.FC<DynamicSidebarProps> = ({
  activeSection,
  onSectionChange,
  drawer = false
}) => {
  // Define sections based on the ConvertAnswersToPromptResponse structure
  const sections = [
    { id: 'personality', label: 'Personality Analysis' },
    { id: 'cvEval', label: 'CV Evaluation' },
    { id: 'skillAssessment', label: 'Skill Assessmenet' },
    { id: 'jobIndustryMatrix', label: 'Job-Industry Matrix' },
    { id: 'actionableGuidance', label: 'ActionableGuidance' },
  ];

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
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
          {sections.map((section) => (
            <div
              key={section.id}
              className={
                activeSection === section.id
                  ? style.progressPartActive
                  : style.progressPartBox
              }
              onClick={() => handleSectionClick(section.id)}
            >
              <span>{section.label}</span>
            </div>
          ))}
        </Box>
      </Box>
    </Card>
  );
};

export default DynamicSidebar;