import Link from 'next/link'
import { Container, Section } from '@/components/ui'
import { generatePageMetadata } from '@/lib/seo'
import { getAllBlogPosts } from '@/lib/content'

export const metadata = generatePageMetadata({
  title: 'Blog',
  description: 'Technical writing on integration architecture, AI agents, enterprise pipelines, and AI-augmented engineering.',
  path: '/blog',
})

export default function BlogPage() {
  const posts = getAllBlogPosts()

  return (
    <Section>
      <Container>
        <div className="blog-index">
          <header className="blog-index__header">
            <p className="blog-index__eyebrow">Blog</p>
            <h1 className="blog-index__title">Technical Writing</h1>
            <p className="blog-index__desc">
              Notes on integration architecture, AI agent design, enterprise pipeline engineering,
              and AI-augmented development workflows.
            </p>
          </header>

          <ol className="blog-index__list">
            {posts.map((post) => (
              <li key={post.slug} className="blog-index__item">
                <article>
                  <Link href={`/blog/${post.slug}`} className="blog-index__link">
                    <div className="blog-index__meta">
                      <time dateTime={post.date} className="blog-index__date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="blog-index__reading">{post.readingTime} read</span>
                    </div>
                    <h2 className="blog-index__heading">{post.title}</h2>
                    <p className="blog-index__excerpt">{post.description}</p>
                    <div className="blog-index__tags">
                      {post.tags.slice(0, 4).map((tag) => (
                        <span key={tag} className="blog-index__tag">{tag}</span>
                      ))}
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  )
}
