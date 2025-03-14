"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface Card {
  title: string
  message: string
  image: string
}

interface Card3DProps {
  card: Card
  isActive: boolean
  offset: number
  zIndex: number
}

export default function Card3D({ card, isActive, offset, zIndex }: Card3DProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Reset flip state when active card changes
  useEffect(() => {
    if (!isActive) {
      setIsFlipped(false)
    }
  }, [isActive])

  return (
    <motion.div
      className="absolute top-0 left-0 w-full h-full perspective-1000"
      animate={{
        x: `calc(50% - 50% + ${offset}px)`,
        rotateY: isActive ? 0 : offset > 0 ? 5 : -5,
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.7,
        zIndex: zIndex,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      <motion.div
        className="relative w-full h-full rounded-2xl shadow-xl overflow-hidden cursor-pointer transform-style-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => isActive && setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden bg-white border-2 border-amber-100 rounded-2xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-3/5">
            <div className="absolute inset-0 bg-amber-200 animate-pulse flex items-center justify-center">
              {!isImageLoaded && <span className="text-amber-700">Loading image...</span>}
            </div>
            <Image
              src={card.image || "/placeholder.svg"}
              alt={card.title}
              fill
              style={{ objectFit: "cover" }}
              onLoad={() => setIsImageLoaded(true)}
              className={`transition-opacity duration-500 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-3">{card.title}</h3>
            <p className="text-amber-700">{card.message}</p>
            {isActive && <p className="mt-4 text-sm text-amber-500">탭하여 뒤집기 ✨</p>}
          </div>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-amber-50 to-white border-2 border-amber-200 rounded-2xl p-6 flex flex-col items-center justify-center rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-4">특별한 메시지</h3>
            <div className="w-16 h-1 bg-amber-300 mx-auto mb-6 rounded-full"></div>
            <p className="text-amber-700 mb-6">
              당신은 제 인생에서 가장 소중한 사람입니다. 매일 당신과 함께하는 시간이 제게는 큰 행복이에요.
            </p>
            <div className="p-4 bg-white/70 rounded-lg shadow-inner">
              <p className="italic text-amber-900">
                &ldquo;사랑은 서로를 바라보는 것이 아니라, 함께 같은 방향을 바라보는 것입니다.&rdquo;
              </p>
            </div>
          </div>
          {isActive && <p className="mt-8 text-sm text-amber-500">탭하여 뒤집기 ✨</p>}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

