"use client"

import { useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"

interface ParallaxSectionProps {
  title: string
  subtitle: string
  message: string
  imageId: string
  align: "left" | "right"
  index: number
}

export default function ParallaxSection({ title, subtitle, message, imageId, align, index }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.8, 1, 1, 0.8])

  // Google Drive 파일 ID에서 직접 보기 가능한 URL로 변환하는 함수
  const getGoogleDriveImageUrl = (fileId: string) => {
    return `https://lh3.googleusercontent.com/d/${fileId}`
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center py-20"
      style={{
        background:
          index % 2 === 0 ? "linear-gradient(to bottom, white, #fffbeb)" : "linear-gradient(to bottom, #fffbeb, white)",
      }}
    >
      <div className="container mx-auto px-4">
        <div
          className={`flex flex-col ${align === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 md:gap-12`}
        >
          {/* Text content */}
          <motion.div className="w-full md:w-1/2 z-10" style={{ opacity, scale }}>
            <div className={`max-w-lg ${align === "left" ? "md:ml-0" : "md:ml-auto"}`}>
              <div className="text-amber-500 font-medium mb-2">{subtitle}</div>
              <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">{title}</h2>
              <div className="w-16 h-1 bg-amber-300 mb-6 rounded-full"></div>
              <p className="text-amber-700 text-lg">{message}</p>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div className="w-full md:w-1/2 relative" style={{ y, opacity }}>
            <div className="relative h-64 md:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isImageLoaded && <span className="text-amber-700">이미지 로딩 중...</span>}
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={getGoogleDriveImageUrl(imageId)}
                  alt={title}
                  width={800}
                  height={600}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                  onLoad={() => setIsImageLoaded(true)}
                  className={`transition-opacity duration-500 w-auto h-auto mx-auto ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

