import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = '화이트데이 카드 '
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom, white, #fffbeb)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 32,
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: '#92400e',
            marginBottom: 24,
          }}
        >
          Happy White Day
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#d97706',
            marginBottom: 48,
            textAlign: 'center',
          }}
        >
          당신을 위한 특별한 선물
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 16,
            border: '4px solid #fbbf24',
            padding: 16,
            background: 'white',
          }}
        >
          <div
            style={{
              fontSize: 32,
              color: '#b45309',
              fontStyle: 'italic',
            }}
          >
            "사랑은 서로를 바라보는 것이 아니라, 함께 같은 방향을 바라보는 것입니다."
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
} 