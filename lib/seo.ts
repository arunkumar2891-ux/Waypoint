import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://arunkumar.dev'
const SITE_NAME = 'Arunkumar JS'
const SITE_DESCRIPTION =
  'Portfolio of Arunkumar JS — Integration Architect, GenAI Developer and Forward Deployment Engineer building enterprise integrations, AI-powered platforms and production software.'

interface PageSEO {
  title: string
  description: string
  path?: string
  image?: string
  type?: 'website' | 'article' | 'profile'
  /** ISO date for article publishedTime (blog/case-study) */
  publishedTime?: string
  /** Tags for article metadata */
  tags?: string[]
}

/**
 * Root layout metadata — sets `title.template` so child pages
 * only need to export a plain title string.
 */
export function generateRootMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${SITE_NAME} — Integration Architect | GenAI Developer | Forward Deployment Engineer`,
      template: `%s — ${SITE_NAME}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: 'Waypoint',
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      title: {
        default: `${SITE_NAME} — Integration Architect | GenAI Developer | Forward Deployment Engineer`,
        template: `%s — ${SITE_NAME}`,
      },
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      siteName: SITE_NAME,
      type: 'website',
      locale: 'en_US',
      images: [
        {
          url: `${SITE_URL}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} — Integration Architect, GenAI Developer, Forward Deployment Engineer`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: {
        default: `${SITE_NAME} — Integration Architect | GenAI Developer | Forward Deployment Engineer`,
        template: `%s — ${SITE_NAME}`,
      },
      description: SITE_DESCRIPTION,
      images: [`${SITE_URL}/opengraph-image`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

/**
 * Per-page metadata — for static and dynamic routes.
 * Uses `title.absolute` so each page controls its full <title> while
 * still inheriting the root template for OG/Twitter via merging.
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  tags,
}: PageSEO): Metadata {
  const url = `${SITE_URL}${path}`
  const ogImage = image || `${SITE_URL}/opengraph-image`

  const openGraph: Metadata['openGraph'] =
    type === 'article'
      ? {
          title,
          description,
          url,
          siteName: SITE_NAME,
          type: 'article',
          publishedTime,
          authors: [SITE_NAME],
          tags,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          locale: 'en_US',
        }
      : {
          title,
          description,
          url,
          siteName: SITE_NAME,
          type,
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          locale: 'en_US',
        }

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

export function generateStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Arunkumar JS',
    jobTitle: 'Integration Architect | GenAI Developer | Forward Deployment Engineer',
    url: SITE_URL,
    sameAs: [
      'https://www.linkedin.com/in/arunkumar-j-s-05164393/',
      'https://github.com/arunkumar2891-ux',
    ],
    knowsAbout: [
      'Enterprise Integration Architecture',
      'Generative AI',
      'Cloud Platform Engineering',
      'SnapLogic iPaaS',
      'Google Cloud Platform',
    ],
  }
}
