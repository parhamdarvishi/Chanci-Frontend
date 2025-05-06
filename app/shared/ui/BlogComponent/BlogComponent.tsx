import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getRequest, deleteRequest, postRequest } from "@/shared/api";
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
  NumberInput,
  Textarea,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import toastAlert from "@/shared/helpers/toast";
import { useForm } from "@mantine/form";
import { relativePaths } from "@/shared/constants/relative-url/other";
import { fixedSectionAddress } from "@/shared/constants/relative-url/fixedsection";
import { BlogItem, BlogResponse } from "@/shared/types/chanci/blog";
import { blogAddress } from "@/shared/constants/relative-url/blog";

const BlogComponent = ({ id }: { id?: string }) => {
  const router = useRouter();
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
    const fetchBlogs = async () => {
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
            description: sectionData.description || "",
            metaKey: sectionData.metaKey || "",
            metaDescription: sectionData.metaDescription || "",
            bannerImagePath: sectionData.bannerImagePath || "",
            authorId: sectionData.authorId || 0,
          });

          // Reset form modified state when loading new data
          setFormModified(false);
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
        toastAlert("Failed to load blog details", "error");
      }
    };

    if (id) {
      fetchBlogs();
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
      };

      const res = await postRequest(blogAddress.Update, formValues, true);
      if (res?.isSuccess) {
        toastAlert("Blog updated successfully", "success");
        // Refresh the question data
        setBlog(formValues as BlogItem);
      } else {
        toastAlert("Failed to update blog", "error");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
      toastAlert("Failed to update blog", "error");
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
      };
      const res = await postRequest(blogAddress.Add, formValues, true);
      if (res?.isSuccess) {
        toastAlert("Blog added successfully", "success");
        // Refresh the question data
        router.push("/panel/blogs");
      } else {
        toastAlert("Failed to add blog", "error");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      toastAlert("Failed to create blog", "error");
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
            Are you sure you want to delete this blog? This action cannot be
            undone.
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
          toastAlert("Blog deleted successfully", "success");
          router.push(relativePaths.panel.fixedSectionList);
        } catch (error) {
          console.error("Error deleting blog:", error);
          toastAlert("Failed to delete blog", "error");
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
                <Box>
                  <Text fw={500}>Title</Text>
                  <Textarea
                    onChange={(e) => {
                      form.setFieldValue("title", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    {form.getInputProps("title").value}
                  </Textarea>
                </Box>
                <Box>
                  <Text fw={500} mb={5}>
                    Description
                  </Text>
                  <Textarea
                    onChange={(e) => {
                      form.setFieldValue("description", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    {form.getInputProps("description").value}
                  </Textarea>
                </Box>
                <Box>
                  <Text fw={500} mb={5}>
                    Meta key
                  </Text>
                  <Textarea
                    onChange={(e) => {
                      form.setFieldValue("metaKey", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    {form.getInputProps("metaKey").value}
                  </Textarea>
                </Box>
                <Box>
                  <Text fw={500} mb={5}>
                    Meta Description
                  </Text>
                  <Textarea
                    onChange={(e) => {
                      form.setFieldValue("metaDescription", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    {form.getInputProps("metaDescription").value}
                  </Textarea>
                </Box>
                <Box>
                  <Text fw={500} mb={5}>
                    Banner Image Path
                  </Text>
                  <Textarea
                    onChange={(e) => {
                      form.setFieldValue("bannerImagePath", e.target.value);
                      setFormModified(true);
                    }}
                  >
                    {form.getInputProps("bannerImagePath").value}
                  </Textarea>
                </Box>
                <Box>
                  <Text fw={500} mb={5}>
                    Author ID
                  </Text>
                  <NumberInput
                    {...form.getInputProps("authorId")}
                    value={blog?.authorId || ""}
                    onChange={(value) => {
                      form.setFieldValue("authorId", Number(value));
                      setFormModified(true);
                    }}
                  />
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
          </Card>
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
