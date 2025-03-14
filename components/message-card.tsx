"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface MessageCardProps {
  imageId: string  // Google Drive 파일 ID로 변경
  message: string
  index: number
}

export default function MessageCard({ imageId, message, index }: MessageCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)

  // Google Drive 파일 ID에서 직접 보기 가능한 URL로 변환하는 함수
  const getGoogleDriveImageUrl = (fileId: string) => {
    return `https://drive.google.com/uc?export=view&id=${fileId}`
  }

  // Different card styles based on index for variety
  const getCardStyle = () => {
    const styles = [
      "bg-white border-amber-200",
      "bg-amber-50 border-amber-300",
      "bg-white border-yellow-200",
      "bg-amber-50 border-yellow-300",
      "bg-gradient-to-br from-white to-amber-100 border-amber-200",
    ]
    return styles[index % styles.length]
  }

  return (
    <motion.div
      className="perspective-1000 cursor-pointer w-full max-w-full md:max-w-2xl mx-auto px-4"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`relative w-full rounded-2xl shadow-xl overflow-hidden border-2 ${getCardStyle()} transition-all duration-500 transform-style-3d min-h-[500px] md:min-h-[800px]`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden p-4 md:p-8 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full flex justify-center items-center mb-4 md:mb-8 rounded-lg overflow-hidden bg-amber-50 p-2 md:p-6">
            <div className="relative w-full">
              <div className="absolute inset-0 bg-amber-200 animate-pulse flex items-center justify-center">
                {!isImageLoaded && <span className="text-amber-700">Loading image...</span>}
              </div>
              <div className="relative w-full pt-[75%]">
                <Image
                  src={getGoogleDriveImageUrl(imageId)}
                  alt="White Day Memory"
                  fill
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                  style={{ objectFit: "contain" }}
                  onLoad={() => setIsImageLoaded(true)}
                  className={`transition-opacity duration-500 rounded-lg ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>
          </div>
          <motion.p
            className="text-lg md:text-2xl text-center font-medium text-amber-800 px-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
          <p className="mt-4 text-sm text-amber-500">Tap to flip ✨</p>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden p-4 md:p-8 flex flex-col items-center justify-center rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">Hidden Message #{index + 1}</h3>
            <p className="text-amber-800 mb-6">
              This is a special hidden message just for you. I could write anything here, but all I want to say is how
              much you mean to me.
            </p>
            <div className="p-4 bg-white/50 rounded-lg shadow-inner">
              <p className="italic text-amber-900">
                &ldquo;Love is not about how many days, months, or years you have been together. Love is about how much you
                love each other every single day.&rdquo;
              </p>
            </div>
          </div>
          <p className="mt-8 text-sm text-amber-500">Tap to flip back ✨</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

