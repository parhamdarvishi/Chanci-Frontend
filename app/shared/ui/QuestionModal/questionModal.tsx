"use client";
import { Box, Button, Select, Textarea } from "@mantine/core";
import React, { useState } from "react";
import style from "./questionModal.module.scss";
import { useForm } from "@mantine/form";
import { postRequest } from "@/shared/api";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { CategoryType, QuestionType, InputType, questionAddresses } from "@/shared/constants/relative-url/question";

const QuestionModal = ({ onSuccess }: { onSuccess?: () => void }) => {
  const [loading, setLoading] = useState(false);
  const questionForm = useForm({
    initialValues: {
      category: 0,
      inputType: 0,
      type: 0,
      text: "",
    },
    validate: {
      text: (value) => (value === "" ? "Please enter question text" : null),
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (questionForm.validate().hasErrors) return;
    setLoading(true);
    
    // Convert string values back to numbers before sending to API
    const formValues = {
      ...questionForm.values,
      category: Number(questionForm.values.category),
      inputType: Number(questionForm.values.inputType),
      type: Number(questionForm.values.type)
    };
    
    const res = await postRequest(
      questionAddresses.Add,
      formValues,
      true
    );
    if (!res?.isSuccess) {
      setLoading(false);
      toastAlert("Something went wrong", "error");
      return;
    }
    toastAlert("Question added successfully", "success");
    modals.closeAll();
    setLoading(false);
    if (onSuccess) onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className={style.modalBox}>
      <Box>
        <Select
          checkIconPosition="right"
          data={Object.entries(CategoryType).map(([label, value]) => ({
            value: value.toString(),
            label
          }))}
          classNames={{
            label: style.labelSelect,
            description: style.description,
            input: style.inputSelect,
          }}
          label="Category"
          placeholder="Select category"
          {...questionForm.getInputProps("category")}
        />
      </Box>
      <Box>
        <Select
          checkIconPosition="right"
          data={Object.entries(QuestionType).map(([label, value]) => ({
            value: value.toString(),
            label: label.replace("_", " ")
          }))}
          classNames={{
            label: style.labelSelect,
            description: style.description,
            input: style.inputSelect,
          }}
          label="Type"
          placeholder="Select type"
          {...questionForm.getInputProps("type")}
        />
      </Box>
      <Box>
        <Select
          checkIconPosition="right"
          data={Object.entries(InputType).map(([label, value]) => ({
            value: value.toString(),
            label: label.replace("_", " ")
          }))}
          classNames={{
            label: style.labelSelect,
            description: style.description,
            input: style.inputSelect,
          }}
          label="Input Type"
          placeholder="Select input type"
          {...questionForm.getInputProps("inputType")}
        />
      </Box>
      <Box>
        <Textarea
          variant="filled"
          classNames={{
            label: style.label,
            description: style.description,
            input: style.inputTextArea,
          }}
          label="Question Text"
          placeholder="Enter question text here"
          minRows={4}
          {...questionForm.getInputProps("text")}
        />
      </Box>
      <Button type="submit" className={style.button} disabled={loading}>
        {loading ? "Submitting..." : "Add Question"}
      </Button>
    </form>
  );
};

export default QuestionModal;