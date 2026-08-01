import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostArticle } from "@/components/sections/BlogPostArticle";
import { CTA } from "@/components/sections/CTA";
import { blogPosts } from "@/lib/mock-data";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) {
    return { title: "Post" };
  }
  return {
    title: `${post.title}`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  return (
    <main className="flex flex-1 flex-col">
      <BlogPostArticle post={post} />
      <CTA />
    </main>
  );
}
