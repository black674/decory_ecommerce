import "@/styles/markdown.css";

import Section from "@/components/ui/section/Section";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useNavigate, useParams } from "react-router-dom";
import MarkdownSkeleton from "@/components/ui/skeleton/MarkdownSkeleton";

export default function MarkdownPage() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const handelMarkdownContent = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`http://localhost:1337/api/${slug}`);
        setContent(data.data[0].merkdown);
      } catch (error) {
        console.error("Error fetching markdown content:", error);
        navigate("/error");
      } finally {
        setLoading(false);
      }
    };
    handelMarkdownContent();
  }, [slug, navigate]);

  if (loading) {
    return <MarkdownSkeleton />;
  }

  return (
    <Section className="py-12 min-h-[80vh]">
      <ReactMarkdown className="markdown">{content}</ReactMarkdown>
    </Section>
  );
}
