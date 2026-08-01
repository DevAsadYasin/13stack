import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import {
  blogPage,
  type BlogArticlePost,
  type BlogBlock,
  type BlogNewsPost,
  type BlogPost,
} from "@/lib/mock-data";
import { HeroRule } from "@/components/ui/HeroRule";
import { Button } from "@/components/ui/Button";

const kindLabel = {
  news: "News",
  article: "Article",
} as const;

function CodeBlock({
  language,
  filename,
  code,
}: {
  language: string;
  filename?: string;
  code: string;
}) {
  return (
    <figure className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-white/10 px-3.5 py-2 sm:px-4">
        <span className="truncate font-mono text-[11px] text-text-03">
          {filename ?? language}
        </span>
        <span className="shrink-0 text-[10px] font-medium tracking-wide text-text-03 uppercase">
          {language}
        </span>
      </figcaption>
      <pre className="overflow-x-auto p-3.5 sm:p-4">
        <code className="font-mono text-[12px] leading-relaxed text-text-02 sm:text-[13px]">
          {code}
        </code>
      </pre>
    </figure>
  );
}

function BlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="max-w-4xl text-base leading-[1.75] text-pretty text-text-02 sm:text-lg">
          {block.text}
        </p>
      );
    case "note":
      return (
        <aside className="w-full rounded-xl border border-primary/25 bg-primary/[0.07] px-4 py-3.5 sm:max-w-4xl sm:px-5 sm:py-4">
          <p className="text-[11px] font-medium tracking-wide text-primary uppercase">
            {block.title}
          </p>
          <p className="mt-2 text-sm leading-relaxed text-pretty text-text-02 sm:text-[15px]">
            {block.text}
          </p>
        </aside>
      );
    case "list":
      return (
        <ul className="flex max-w-4xl flex-col gap-2.5 border-l border-white/15 pl-4">
          {block.items.map((item) => (
            <li
              key={item}
              className="text-sm leading-relaxed text-pretty text-text-02 sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="w-full">
          <CodeBlock
            language={block.language}
            filename={block.filename}
            code={block.code}
          />
        </div>
      );
    default:
      return null;
  }
}

function PostMeta({ post }: { post: BlogPost }) {
  return (
    <aside className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-white/10 pb-5 lg:sticky lg:top-28 lg:flex-col lg:items-start lg:gap-5 lg:border-b-0 lg:pb-0">
      <span className="rounded-md border border-primary/30 bg-primary/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-primary uppercase">
        {kindLabel[post.kind]}
      </span>
      <dl className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-text-03 lg:flex-col lg:items-start lg:gap-3">
        <div>
          <dt className="sr-only">Published</dt>
          <dd>
            <time dateTime={post.date}>{post.dateLabel}</time>
          </dd>
        </div>
        <div>
          <dt className="sr-only">Reading time</dt>
          <dd>{post.readingTime} read</dd>
        </div>
        <div className="lg:w-full lg:border-t lg:border-white/10 lg:pt-2">
          <dt className="sr-only">Author</dt>
          <dd className="text-text-02">{post.author}</dd>
        </div>
      </dl>

      {post.kind === "article" ? (
        <nav
          aria-label="Sections"
          className="hidden w-full border-t border-white/10 pt-4 lg:block"
        >
          <p className="mb-3 text-[10px] font-medium tracking-wide text-text-03 uppercase">
            In this article
          </p>
          <ol className="flex flex-col gap-2">
            {post.sections.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-[12px] leading-snug text-text-03 transition-colors hover:text-white"
                >
                  <span className="mr-1.5 font-mono text-[10px] text-primary/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
    </aside>
  );
}

function NewsBody({ post }: { post: BlogNewsPost }) {
  const primary = post.links[0];
  const secondary = post.links.slice(1);

  return (
    <div className="mt-8 flex w-full flex-col gap-6 sm:mt-10 sm:gap-7">
      <aside className="w-full overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 via-primary/[0.07] to-transparent px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-[11px] font-medium tracking-wide text-primary uppercase">
          {post.announcement.badge}
        </p>
        <p className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
          {post.announcement.title}
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-pretty text-text-02 sm:text-[15px]">
          {post.announcement.text}
        </p>
      </aside>

      {post.body.map((paragraph, i) => (
        <p
          key={paragraph.slice(0, 32)}
          className={`max-w-4xl leading-[1.75] text-pretty ${
            i === 0
              ? "text-lg text-text-02 sm:text-xl"
              : "text-base text-text-02 sm:text-lg"
          }`}
        >
          {paragraph}
        </p>
      ))}

      <div className="flex w-full flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
        {primary ? (
          primary.external ? (
            <a
              href={primary.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium tracking-tight text-white transition-colors hover:brightness-110"
            >
              {primary.label}
              <ArrowUpRight size={14} />
            </a>
          ) : (
            <Button href={primary.href} variant="primary">
              {primary.label}
            </Button>
          )
        ) : null}

        {secondary.map((link) =>
          link.external ? (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-03 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight size={13} />
            </a>
          ) : (
            <Link
              key={link.href}
              href={link.href}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-text-03 transition-colors hover:text-white"
            >
              {link.label}
              <ArrowUpRight size={13} />
            </Link>
          ),
        )}
      </div>
    </div>
  );
}

function ArticleBody({ post }: { post: BlogArticlePost }) {
  return (
    <div className="mt-8 flex w-full flex-col gap-10 sm:mt-10 sm:gap-12">
      <section
        aria-labelledby="brief-heading"
        className="w-full rounded-2xl border border-white/10 bg-card-bg px-5 py-5 sm:px-6 sm:py-6"
      >
        <h2
          id="brief-heading"
          className="text-[11px] font-medium tracking-wide text-primary uppercase"
        >
          Brief
        </h2>
        <ul className="mt-4 flex flex-col gap-3">
          {post.brief.map((item) => (
            <li
              key={item}
              className="flex gap-3 text-sm leading-relaxed text-pretty text-text-02 sm:text-[15px]"
            >
              <span
                className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {post.sections.map((section, i) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-28 flex w-full flex-col gap-5 sm:gap-6"
        >
          <div className="flex w-full items-baseline gap-3 border-b border-white/10 pb-3">
            <span className="font-mono text-[11px] tracking-wide text-primary">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              {section.title}
            </h2>
          </div>
          <div className="flex w-full flex-col gap-5 sm:gap-6">
            {section.blocks.map((block, bi) => (
              <BlockView
                key={`${section.id}-${block.type}-${bi}`}
                block={block}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

export function BlogPostArticle({ post }: { post: BlogPost }) {
  return (
    <article className="px-gutter pt-28 pb-10 sm:pt-36 sm:pb-14">
      <div className="mx-auto w-full max-w-[var(--page-max-width)]">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-text-03 transition-colors hover:text-white"
        >
          <ArrowLeft size={14} />
          {blogPage.backLabel}
        </Link>

        <div className="mt-8 grid w-full gap-8 sm:mt-10 lg:mt-12 lg:grid-cols-[10.5rem_minmax(0,1fr)] lg:items-start lg:gap-10 xl:grid-cols-[12rem_minmax(0,1fr)] xl:gap-14">
          <PostMeta post={post} />

          <div className="min-w-0 w-full">
            <header className="flex w-full flex-col gap-4 border-b border-white/10 pb-8 sm:gap-5 sm:pb-10">
              <h1 className="text-[clamp(2rem,3.8vw+0.6rem,3.25rem)] font-medium tracking-tight leading-[1.12] text-balance">
                {post.title}
              </h1>
              <p className="max-w-4xl text-base leading-relaxed text-pretty text-text-03 sm:text-lg">
                {post.excerpt}
              </p>
            </header>

            {post.kind === "news" ? (
              <NewsBody post={post} />
            ) : (
              <ArticleBody post={post} />
            )}
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-16">
        <HeroRule />
      </div>
    </article>
  );
}
