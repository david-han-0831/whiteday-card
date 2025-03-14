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
      className="perspective-1000 cursor-pointer w-full max-w-full mx-auto px-4"
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className={`relative w-full rounded-2xl shadow-xl overflow-hidden border-2 ${getCardStyle()} transition-all duration-500 transform-style-3d min-h-[400px] md:min-h-[600px]`}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Front of card */}
        <motion.div
          className="absolute inset-0 backface-hidden p-4 md:p-6 flex flex-col items-center justify-center"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="w-full flex justify-center items-center mb-4 md:mb-6">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 flex items-center justify-center">
                {!isImageLoaded && <span className="text-amber-700">이미지 로딩 중...</span>}
              </div>
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={getGoogleDriveImageUrl(imageId)}
                  alt="White Day Memory"
                  width={800}
                  height={600}
                  priority
                  style={{ objectFit: "contain", maxHeight: "100%", maxWidth: "100%" }}
                  onLoad={() => setIsImageLoaded(true)}
                  className={`transition-opacity duration-500 w-auto h-auto mx-auto ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            </div>
          </div>
          <motion.p
            className="text-base md:text-xl text-center font-medium text-amber-800 px-2 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {message}
          </motion.p>
          <p className="mt-2 text-sm text-amber-500">탭하여 뒤집기 ✨</p>
        </motion.div>

        {/* Back of card */}
        <motion.div
          className="absolute inset-0 backface-hidden p-4 md:p-6 flex flex-col items-center justify-center rotate-y-180"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-bold text-amber-700 mb-4">숨겨진 메시지 #{index + 1}</h3>
            <p className="text-amber-800 mb-6">
              당신만을 위한 특별한 메시지입니다. 여기에 어떤 말이든 쓸 수 있지만, 당신이 내게 얼마나 소중한지 말하고 싶어요.
            </p>
            <div className="p-4 bg-white/50 rounded-lg shadow-inner">
              <p className="italic text-amber-900">
                &ldquo;사랑은 함께한 날, 달, 년의 수가 아니라 매일 서로를 얼마나 사랑하는지에 관한 것입니다.&rdquo;
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-amber-500">탭하여 뒤집기 ✨</p>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

