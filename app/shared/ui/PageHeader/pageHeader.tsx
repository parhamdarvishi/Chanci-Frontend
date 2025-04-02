"use client";
import { Button, Flex, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React from "react";
import styles from "./pageHeader.module.scss";

interface PageHeaderProps {
  title: string;
  onAddClick?: () => void;
  showAddButton?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  onAddClick,
  showAddButton = true,
}) => {
  return (
    <Flex className={styles.header} justify="space-between" align="center" mb="md">
      <Title order={2}>{title}</Title>
      {showAddButton && (
        <Button
          leftSection={<IconPlus size={16} />}
          onClick={onAddClick}
          className={styles.addButton}
        >
          Add New
        </Button>
      )}
    </Flex>
  );
};

export default PageHeader;