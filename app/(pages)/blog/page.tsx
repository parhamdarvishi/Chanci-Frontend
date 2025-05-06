"use client";
import { getRequest } from "@/shared/api";
import { API_BASE_URL } from "@/shared/config/env";
import React from "react";
import { useEffect, useState } from "react";
type BlogItem = {
  id: number;
  title: string;
  description: string;
  bannerImagePath: string;
  author?: {
    fullName: string;
    jobTitle: string;
  };
};

type Data = {
  items: BlogItem[];
};

type BlogResponse = {
  isSuccess?: boolean;
  data?: Data;
};

const Blog = () => {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const eventFetch = async () => {
    const reqBody = {
      Skip: 0,
      Take: 1000,
    };
    const res: BlogResponse = await getRequest(
      `${API_BASE_URL}/api/Blog/GetAll`,
      reqBody,
      false
    );
    if (res?.isSuccess && res.data?.items) {
      setBlogs(res.data.items);
    }
    return [];
  };
  useEffect(() => {
    eventFetch();
  }, []);
  return (
    <div>
      <h1>Blog List</h1>
      {blogs.map((blog: any) => (
        <div key={blog.id}>
          <h2>{blog.title} test</h2>
          <p>{blog.description}</p>
          <p>
            <strong>By:</strong> {blog.author.fullName} – {blog.author.jobTitle}
          </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Blog;
