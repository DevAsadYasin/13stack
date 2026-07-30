"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPosts, homeBlog } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { TextLink } from "@/components/ui/TextLink";

const kindLabel = {
  news: "News",
  article: "Article",
} as const;

export function Blog() {
  const posts = blogPosts.slice(0, homeBlog.previewCount);

  return (
    <section className="px-gutter py-16 sm:py-20">
      <RevealGroup className="w-full items-stretch gap-10 sm:gap-12 lg:grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">
        <div className="flex max-w-xl flex-col gap-5 text-left sm:gap-6">
          <RevealItem className="flex flex-col gap-3 sm:gap-4">
            <p className="text-xs font-medium tracking-wide text-primary uppercase">
              {homeBlog.eyebrow}
            </p>
            <h2 className="text-[clamp(1.75rem,3vw+0.8rem,2.5rem)] font-medium tracking-tight leading-[1.15] text-balance">
              {homeBlog.title}
            </h2>
            <p className="text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
              {homeBlog.subtitle}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-base leading-relaxed text-pretty text-text-02 sm:text-lg">
              {homeBlog.body}
            </p>
          </RevealItem>

          <RevealItem>
            <p className="text-sm leading-relaxed text-pretty text-text-03 sm:text-base">
              {homeBlog.aside}
            </p>
          </RevealItem>

          <RevealItem className="pt-1">
            <TextLink href={homeBlog.viewAllHref}>
              {homeBlog.viewAllLabel}
            </TextLink>
          </RevealItem>
        </div>

        <div className="flex w-full flex-col border-t border-white/10">
          {posts.map((post) => (
            <RevealItem key={post.slug} className="w-full">
              <Link
                href={`/blog/${post.slug}`}
                className="group flex w-full items-start gap-4 border-b border-white/10 py-5 transition-colors sm:gap-5 sm:py-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[11px] font-medium tracking-wide text-primary uppercase">
                      {kindLabel[post.kind]}
                    </span>
                    <span className="text-xs text-text-03">
                      {post.dateLabel}
                    </span>
                    <span className="text-xs text-text-03">
                      {post.readingTime}
                    </span>
                  </div>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-white transition-colors group-hover:text-primary sm:text-xl">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-pretty text-text-03 sm:text-[15px]">
                    {post.excerpt}
                  </p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                />
              </Link>
            </RevealItem>
          ))}
        </div>
      </RevealGroup>
    </section>
  );
}
