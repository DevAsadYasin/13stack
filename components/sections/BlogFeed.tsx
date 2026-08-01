"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { blogPage, blogPosts, type BlogPostKind } from "@/lib/mock-data";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

type FilterId = "all" | BlogPostKind;

const kindLabel = {
  news: "News",
  article: "Article",
} as const;

export function BlogFeed() {
  const [filter, setFilter] = useState<FilterId>("all");

  const posts = useMemo(() => {
    if (filter === "all") return blogPosts;
    return blogPosts.filter((post) => post.kind === filter);
  }, [filter]);

  return (
    <section className="px-gutter pb-20 sm:pb-24">
      <RevealGroup className="w-full items-start gap-8 sm:gap-10">
        <RevealItem className="flex w-full flex-wrap gap-2 border-b border-white/10 pb-4">
          {blogPage.filters.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-white"
                    : "border border-white/10 text-text-03 hover:border-white/25 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </RevealItem>

        {posts.length === 0 ? (
          <RevealItem className="w-full max-w-lg py-10">
            <h2 className="text-xl font-semibold tracking-tight">
              {blogPage.emptyTitle}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text-03 sm:text-base">
              {blogPage.emptyBody}
            </p>
          </RevealItem>
        ) : (
          <div className="flex w-full flex-col border-t border-white/10">
            {posts.map((post, i) => (
              <RevealItem key={post.slug} className="w-full">
                <Link
                  href={`/blog/${post.slug}`}
                  className={`group grid w-full grid-cols-1 gap-3 border-b border-white/10 py-6 transition-colors sm:grid-cols-[7.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-6 sm:py-7 ${
                    i === 0 ? "pt-6" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 sm:flex-col sm:items-start sm:gap-2">
                    <span className="text-[11px] font-medium tracking-wide text-primary uppercase">
                      {kindLabel[post.kind]}
                    </span>
                    <time
                      dateTime={post.date}
                      className="text-xs text-text-03 sm:text-sm"
                    >
                      {post.dateLabel}
                    </time>
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold tracking-tight text-white transition-colors group-hover:text-primary sm:text-2xl">
                      {post.title}
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-pretty text-text-03 sm:text-base">
                      {post.excerpt}
                    </p>
                    <p className="mt-3 text-xs text-text-03">
                      {post.author} · {post.readingTime}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="hidden shrink-0 text-white/30 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary sm:mt-1 sm:block"
                  />
                </Link>
              </RevealItem>
            ))}
          </div>
        )}
      </RevealGroup>
    </section>
  );
}
