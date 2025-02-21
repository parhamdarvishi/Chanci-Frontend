"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Card } from "@mantine/core";
import Image from "next/image";
import chanciIc from "@public/image/chanciAI/icon/chanciCh.svg";
import { IconPhotoDown } from "@tabler/icons-react";
import { postRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";

const UploadQuestion = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const { updateQuestionIndex, questionIndex } = useChanci();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name); // Set the file name in state
    }
    const formData = new FormData();
    formData.append("File", file as File);
    const { isSuccess } = await postRequest(
      chanciAddresses.Add,
      formData,
      true,
      true
    );
    if (isSuccess) {
      updateQuestionIndex(questionIndex + 1);
    }
  };

  return (
    <div className={style.wrapper}>
      <Box className={style.userBox}>
        <Avatar radius="xl" size={"lg"} />
        <Box className={style.questionTitle}>
          {/* <p>{question?.text}</p> */}
          <p>Please upload your CV for review.</p>
        </Box>
      </Box>
      <Box className={style.questionPart}>
        <Box className={style.questionBox}>
          <Card
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            className={style.questionCard}
          >
            <div
              style={{ display: "flex", gap: ".3rem", flexDirection: "column" }}
            >
              <strong>Upload your File </strong>
              <p style={{ color: "#2E2E2E" }}>File should be JPG, PNG, PDF</p>
            </div>

            <div className={style.uploader}>
              {/* Replace with an actual icon if needed */}
              <IconPhotoDown className={style.uploaderImg} />
              <div>
                <p>Max file size: 15 MB</p>
                <div>Drag and drop your file or</div>
              </div>

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the default file input
                id="file-upload"
              />
              <label htmlFor="file-upload" className={style.browseButton}>
                {fileName ? fileName : "Browse File"}
              </label>
            </div>
          </Card>
          <Image
            src={chanciIc}
            alt="chanciIcon"
            className={style.questionImg}
          />
        </Box>
      </Box>
    </div>
  );
};

export default UploadQuestion;
