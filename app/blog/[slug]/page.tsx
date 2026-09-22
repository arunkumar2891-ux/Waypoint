import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { getBlogPostBySlug, getAllBlogPosts, getAdjacentBlogPost, getWorkBySlug, getProjectBySlug } from '@/lib/content'
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import type { Metadata } from 'next'
import type { BlogBlock } from '@/lib/types'

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts()
  return posts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) return {}

  return generatePageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: 'article',
    publishedTime: new Date(post.date).toISOString(),
    tags: post.tags,
  })
}

function renderBlock(block: BlogBlock, index: number, isFirst: boolean) {
  if (typeof block === 'string') {
    return (
      <p
        key={index}
        className={`blog-article__paragraph${isFirst && index === 0 ? ' blog-article__paragraph--lead' : ''}`}
      >
        {block}
      </p>
    )
  }

  if (block.type === 'pullquote') {
    return (
      <blockquote key={index} className="blog-article__pullquote">
        {block.text}
      </blockquote>
    )
  }

  if (block.type === 'callout') {
    return (
      <div key={index} className="blog-article__callout" role="group" aria-label="Key metrics">
        {block.items.map((item) => (
          <div key={item.label} className="blog-article__callout-item">
            <span className="blog-article__callout-value">{item.value}</span>
            <span className="blog-article__callout-label">{item.label}</span>
          </div>
        ))}
      </div>
    )
  }

  return null
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug)
  if (!post) notFound()

  const { prev, next } = getAdjacentBlogPost(slug)

  const relatedWorkEntries = (post.relatedWork ?? [])
    .map((s) => getWorkBySlug(s))
    .filter((w) => w !== undefined)

  const relatedProjectEntries = (post.relatedProjects ?? [])
    .map((s) => getProjectBySlug(s))
    .filter((p) => p !== undefined)

  return (
    <>
      {/* Header */}
      <Section>
        <Container>
          <Link
            href="/blog"
            className="blog-back"
          >
            <ArrowLeft size={16} />
            Back to Blog
          </Link>

          <article className="blog-article">
            <header className="blog-article__header">
              <div className="blog-article__meta">
                <time dateTime={post.date} className="blog-article__date">
                  {new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
                <span className="blog-article__dot">·</span>
                <span className="blog-article__reading">{post.readingTime} read</span>
              </div>

              <h1 className="blog-article__title">{post.title}</h1>
              <p className="blog-article__description">{post.description}</p>

              <div className="blog-article__tags">
                {post.tags.map((tag) => (
                  <span key={tag} className="blog-article__tag">{tag}</span>
                ))}
              </div>
            </header>

            {/* Body */}
            <div className="blog-article__body">
              {post.sections.map((section, i) => (
                <section key={i} className="blog-article__section">
                  <h2 className="blog-article__section-heading">{section.heading}</h2>
                  {section.body.map((block, j) => renderBlock(block, j, i === 0))}
                </section>
              ))}
            </div>

            {/* Related Work / Projects */}
            {(relatedWorkEntries.length > 0 || relatedProjectEntries.length > 0) && (
              <footer className="blog-article__related">
                <h3 className="blog-article__related-heading">Related</h3>
                <ul className="blog-article__related-list">
                  {relatedWorkEntries.map((w) => (
                    <li key={w.slug}>
                      <Link href={`/work/${w.slug}`} className="blog-article__related-link">
                        {w.title}
                        <span className="blog-article__related-type">Case Study</span>
                      </Link>
                    </li>
                  ))}
                  {relatedProjectEntries.map((p) => (
                    <li key={p.slug}>
                      <Link href={`/projects/${p.slug}`} className="blog-article__related-link">
                        {p.title}
                        <span className="blog-article__related-type">Project</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </footer>
            )}
          </article>
        </Container>
      </Section>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <Section className="border-t border-border">
          <Container>
            <nav className="blog-nav" aria-label="Blog post navigation">
              {prev ? (
                <Link href={`/blog/${prev.slug}`} className="blog-nav__link blog-nav__link--prev">
                  <ChevronLeft size={16} />
                  <div>
                    <span className="blog-nav__label">Previous</span>
                    <span className="blog-nav__title">{prev.title}</span>
                  </div>
                </Link>
              ) : <div />}
              {next ? (
                <Link href={`/blog/${next.slug}`} className="blog-nav__link blog-nav__link--next">
                  <div>
                    <span className="blog-nav__label">Next</span>
                    <span className="blog-nav__title">{next.title}</span>
                  </div>
                  <ChevronRight size={16} />
                </Link>
              ) : <div />}
            </nav>
          </Container>
        </Section>
      )}
    </>
  )
}
