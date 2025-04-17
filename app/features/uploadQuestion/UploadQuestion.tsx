"use client";
import React, { useState } from "react";
import style from "./style.module.scss";
import { Avatar, Box, Button, Card } from "@mantine/core";
import {
  IconArrowNarrowLeft,
  IconArrowNarrowRight,
  IconArrowRight,
  IconPhotoDown,
} from "@tabler/icons-react";
// import { postRequest } from "@/shared/api";
// import { chanciAddresses } from "@/shared/constants/relative-url/chanci";
import { useChanci } from "@/shared/stateManagement/UseChanci/useChanci";
import chanciIcon from "@public/image/chanciAI/icon/chanciCh.svg";
import Image from "next/image";
import { postUploadRequest } from "@/shared/api";
import { chanciAddresses } from "@/shared/constants/relative-url/chanci";

const UploadQuestion = () => {
  const { updateQuestionIndex, questionIndex, updateFileName, fileName } =
    useChanci();
  const [fileCh, setFileCh] = useState<File | null>(null);
  const handleFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileCh(file);
      updateFileName(file?.name || "");
    }
  };
  const handleFileChange = async () => {
    // const file = event.target.files?.[0];
    // if (file) {
    //   setUploadFileName(file.name); // Set the file name in state
    // }
    const formData = new FormData();
    formData.append("File", fileCh as File);
    const { isSuccess } = await postUploadRequest(
      chanciAddresses.Add,
      formData,
      true,
      true
    );
    if (isSuccess) {
      updateFileName(fileCh?.name || "");
      updateQuestionIndex(questionIndex + 1);
    }
  };

  const handleQustionIndex = () => {
    updateQuestionIndex(questionIndex - 1);
  };

  const handleQustionNext = () => {
    updateQuestionIndex(questionIndex + 1);
  };
  return (
    <div className={style.wrapper}>
      <Box className={style.userBox}>
        <Avatar
          src="image/chanciAI/chanci.svg"
          alt="it's me"
          size={55}
          className={style.questionImgChanci}
        />
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
              <p style={{ color: "#2E2E2E" }}>
                File should be doc , docx , pdf
              </p>
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
                accept=".doc,.docx,.pdf"
                onChange={handleFile}
                style={{ display: "none" }} // Hide the default file input
                id="file-upload"
              />
              <label htmlFor="file-upload" className={style.browseButton}>
                {fileName ? fileName : "Browse File"}
              </label>
            </div>
          </Card>
          <Image
            src={chanciIcon}
            alt="chanciIcon"
            className={style.questionImg}
          />
        </Box>
        <Box style={{ display: "flex", justifyContent: "end" }}>
          <div 
            className={`${style.btnChanci} ${fileCh ? '' : style.disabled}`} 
            onClick={fileCh ? handleFileChange : undefined}
          >
            Next <IconArrowRight /> 
          </div>
        </Box>
      </Box>
      <Box style={{ display: "flex", width: "100%" }}>
        <Box
          style={{
            padding: "0 3rem",
            opacity: questionIndex > 0 ? 1 : 0,
            transform:
              questionIndex > 0 ? "translateX(0)" : "translateX(-20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: questionIndex > 0 ? "visible" : "hidden",
          }}
        >
          <Button
            variant="light"
            style={{
              padding: "0.7rem",
              transition: "transform 0.2s ease",
              transform: "scale(1)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleQustionIndex}
          >
            <IconArrowNarrowLeft size={30} />
          </Button>
        </Box>
        <Box
          style={{
            opacity: fileName !== "" ? 1 : 0,

            transform: fileName !== "" ? "translateX(0)" : "translateX(20px)",
            transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
            visibility: fileName !== "" ? "visible" : "hidden",
          }}
        >
          <Button
            variant="light"
            style={{
              padding: "0.7rem",
              transition: "transform 0.2s ease",
              transform: "scale(1)",
              ":hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={handleQustionNext}
          >
            <IconArrowNarrowRight size={30} />
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default UploadQuestion;
