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
          backgroundColor: '#0A0A0A',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: 48,
            height: 4,
            backgroundColor: '#F2C94C',
            marginBottom: 32,
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: '#F5F5F0',
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
            color: '#A3A3A3',
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
            color: '#737373',
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
