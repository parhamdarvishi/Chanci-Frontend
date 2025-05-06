import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getRequest,
  deleteRequest,
  putRequest,
  postRequest,
} from "@/shared/api";
import {
  Button,
  Card,
  Group,
  Text,
  Title,
  Stack,
  Box,
  Center,
  Loader,
  Select,
  NumberInput,
  Textarea,
} from "@mantine/core";
import { CategoryType } from "@/shared/constants/relative-url/question";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";
import {
  FixedSection,
  FixedSectionResponse,
} from "@/shared/types/chanci/fixedSection";
import { fixedSectionAddress } from "@/shared/constants/relative-url/fixedsection";
import Editor from "@/shared/ui/RichTextEditor/RichTextEditor";
import { BlogItem, BlogResponse } from "@/shared/types/chanci/blog";
import { blogAddress } from "@/shared/constants/relative-url/blog";

const BlogComponent = ({ id }: { id?: string }) => {
  const router = useRouter();
  //   const [fixedSection, setFixedSection] = useState<FixedSection | undefined>(
  //     undefined
  //   );
  const [blog, setBlog] = useState<BlogItem | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<BlogItem>({
    initialValues: {
      id: 0,
      index: 0,
      title: "",
      metaKey: "",
      metaDescription: "",
      description: "",
      bannerImagePath: "",
      authorId: 0,
      author: {
        id: 0,
        fullName: "",
        linkToProfile: "",
        jobTitle: "",
        isDeleted: false,
        blogs: "",
      },
    },
  });

  // Track if form has been modified
  const [formModified, setFormModified] = useState<boolean>(false);

  useEffect(() => {
    const fetchFixedSection = async () => {
      const reqBody = {
        id: id,
        Skip: 0,
        Take: 1,
      };
      try {
        const res: BlogResponse = await getRequest(
          blogAddress.GetById,
          reqBody,
          false
        );
        const sectionData = res?.data?.items?.[0];
        setBlog(sectionData);

        if (sectionData) {
          // Convert numeric values to strings for Select components
          form.setValues({
            id: sectionData.id || 0,
            index: sectionData.index || 0,
            title: sectionData.title || "",
            // innerHtml: sectionData.innerHtml || "",
            // minValue: sectionData?.minValue || null,
            // maxValue: sectionData?.maxValue || null,
            // categoryType: sectionData?.categoryType,
          });

          // Reset form modified state when loading new data
          setFormModified(false);
        }
      } catch (error) {
        console.error("Error fetching fixedSection:", error);
        toastAlert("Failed to load fixedSection details", "error");
      }
    };

    if (id) {
      fetchFixedSection();
    } else {
      setBlog(form.getInitialValues);
    }
  }, [id]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Convert string values back to numbers before sending to API
      const formValues = {
        ...form.values,
        id: Number(id),
        // categoryType: Number(form.values.categoryType),
      };

      const res = await postRequest(
        blogAddress.Update,
        formValues,
        true
      );
      if (res?.isSuccess) {
        toastAlert("Fixed Section updated successfully", "success");
        // Refresh the question data
        setBlog(formValues as BlogItem);
      } else {
        toastAlert("Failed to update fixedSection", "error");
      }
    } catch (error) {
      console.error("Error updating fixedSection:", error);
      toastAlert("Failed to update fixedSection", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async () => {
    if (form.validate().hasErrors) return;
    setLoading(true);
    try {
      // Convert string values back to numbers before sending to API
      const formValues = {
        ...form.values,
        // categoryType: Number(form.values.categoryType),
      };
      const res = await postRequest(fixedSectionAddress.Add, formValues, true);
      if (res?.isSuccess) {
        toastAlert("Fixed Section added successfully", "success");
        // Refresh the question data
        router.push("/panel/fixedsections");
      } else {
        toastAlert("Failed to add fixedSection", "error");
      }
    } catch (error) {
      console.error("Error adding fixedSection:", error);
      toastAlert("Failed to create fixedSection", "error");
    } finally {
      setLoading(false);
    }
  };
  const handleDelete = () => {
    modals.openConfirmModal({
      title: "Delete Question",
      centered: true,
      styles: {
        content: { padding: "20px" },
        body: { padding: "0" },
      },
      children: (
        <Box>
          <Text size="sm">
            Are you sure you want to delete this fixedSection? This action
            cannot be undone.
          </Text>
        </Box>
      ),
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onConfirm: async () => {
        try {
          await deleteRequest(
            `${fixedSectionAddress.Delete}?Id=${id}`,
            {},
            true
          );
          toastAlert("FixedSection deleted successfully", "success");
          router.push(relativePaths.panel.fixedSectionList);
        } catch (error) {
          console.error("Error deleting fixedSection:", error);
          toastAlert("Failed to delete fixedSection", "error");
        }
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {blog !== undefined ? (
        <>
          <Group justify="space-between" mb="xl">
            <Title order={2}>Blog Details</Title>
          </Group>
          <Card shadow="sm" p="lg" radius="md" withBorder>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (id) {
                  handleUpdate();
                } else handleCreate();
              }}
            >
              <Stack gap="md">
                {/* <Box>
                  <Text fw={500}>Order:</Text>
                  <NumberInput
                    {...form.getInputProps("order")}
                    value={fixedSection.order}
                    onChange={(value) => {
                      form.setFieldValue("order", Number(value));
                      setFormModified(true);
                    }}
                  />
                </Box> */}
                <Box>
                  <Text fw={500}>Title</Text>
                  {/* <NumberInput
                    {...form.getInputProps("minValue")}
                    value={fixedSection?.minValue || ""}
                    onChange={(value) => {
                      form.setFieldValue("minValue", Number(value));
                      setFormModified(true);
                    }}
                  /> */}
                </Box>
                {/* <Box>
                  <Text fw={500}>Maximum Value:</Text>
                  <NumberInput
                    {...form.getInputProps("maxValue")}
                    value={fixedSection.maxValue || ""}
                    onChange={(value) => {
                      form.setFieldValue("maxValue", Number(value));
                      setFormModified(true);
                    }}
                  />
                </Box> */}
                {/* <Box>
                  <Text fw={500} mb={5}>
                    Category Type:
                  </Text>
                  <Select
                    data={Object.entries(CategoryType).map(
                      ([label, value]) => ({
                        value: value.toString(),
                        label,
                      })
                    )}
                    placeholder="Select category"
                    {...form.getInputProps("categoryType")}
                    value={
                      form.getInputProps("categoryType").value.toString() ?? ""
                    }
                    onChange={(value) => {
                      form.setFieldValue("categoryType", Number(value));
                      setFormModified(true);
                    }}
                  />
                </Box> */}
                <Box>
                  <Text fw={500} mb={5}>
                    Description
                  </Text>
                  <Box>
                    <Textarea>
                      {form.getInputProps("description").value}
                    </Textarea>
                    <Editor
                      content={form.getInputProps("innerHtml").value}
                      onChange={(editorText) => {
                        form.setFieldValue("innerHtml", editorText);
                        setFormModified(true);
                      }}
                    />
                  </Box>
                </Box>

                <Group justify="flex-end" mt="md">
                  <Button
                    variant="filled"
                    color="red"
                    onClick={handleDelete}
                    type="button"
                  >
                    Delete
                  </Button>
                  {id ? (
                    <Button
                      variant="filled"
                      color="blue"
                      type="submit"
                      loading={loading}
                      disabled={!formModified}
                    >
                      Update
                    </Button>
                  ) : (
                    <Button
                      variant="filled"
                      color="blue"
                      type="submit"
                      loading={loading}
                      disabled={!formModified}
                    >
                      Add
                    </Button>
                  )}
                </Group>
              </Stack>
            </form>
          </Card>{" "}
        </>
      ) : (
        <Center>
          {" "}
          <Loader color="blue" />{" "}
        </Center>
      )}
    </div>
  );
};
export default BlogComponent;
