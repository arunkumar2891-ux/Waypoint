import { ImageResponse } from 'next/og'

export const alt = 'Arunkumar JS — Integration Architect, GenAI Developer, Forward Deployment Engineer'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          backgroundColor: '#FAFAF8',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 48,
            height: 4,
            backgroundColor: '#2563eb',
            marginBottom: 32,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#171717',
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Arunkumar JS
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            color: '#737373',
            lineHeight: 1.4,
            marginBottom: 40,
          }}
        >
          Integration Architect · GenAI Developer · Forward Deployment Engineer
        </div>

        {/* Brand */}
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: '#a3a3a3',
            letterSpacing: '0.12em',
            textTransform: 'uppercase' as const,
          }}
        >
          WAYPOINT
        </div>
      </div>
    ),
    { ...size }
  )
}
