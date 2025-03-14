"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Image from "next/image"
import ParallaxSection from "@/components/parallax-section"
import AudioControl from "@/components/audio-control"
import FloatingParticles from "@/components/floating-particles"
import FinalMessage from "@/components/final-message"

export default function Home() {
  const [isMuted, setIsMuted] = useState(false)
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const sections = [
    {
      title: "화이트데이",
      subtitle: "당신을 위한 특별한 날",
      message: "오늘 화이트데이를 맞아 당신에게 제 마음을 전합니다.",
      imageId: "1obSjXI0kussPH0s6R5rgOgNaefp86n7e",
      align: "right",
    },
    {
      title: "첫 만남",
      subtitle: "우리의 시작",
      message: "당신을 처음 만난 그 순간부터 내 인생은 더 밝아졌어요.",
      imageId: "1vBJc0z1yqWfJnE9vq4sgZfK5zUK7IJxV",
      align: "left",
    },
    {
      title: "함께한 시간",
      subtitle: "소중한 추억",
      message: "당신과 함께한 모든 순간이 제 인생에서 가장 소중한 추억이에요.",
      imageId: "1jglWonrYGE8aPA0UaIeWDZx6TWvOBxAP",
      align: "right",
    },
    {
      title: "우리의 이야기",
      subtitle: "계속되는 여정",
      message: "우리가 함께 만들어가는 이야기는 매일매일 더 아름다워져요.",
      imageId: "1KKsSWbiRFQeGMfRd1ybHkSUwxAun7GqS",
      align: "left",
    },
  ]

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false)
      } else {
        setShowScrollIndicator(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const progressBarWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <main ref={containerRef} className="relative bg-white">
      {/* Floating particles background */}
      <FloatingParticles />

      {/* Audio control */}
      <div className="fixed top-5 right-5 z-50">
        <AudioControl ref={audioRef} isMuted={isMuted} toggleMute={toggleMute} />
      </div>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-amber-100 z-40">
        <motion.div className="h-full bg-amber-400" style={{ width: progressBarWidth }} />
      </div>

      {/* Hero section */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10 px-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-amber-800 mb-4">Happy White Day</h1>
          <p className="text-xl text-amber-600 max-w-md mx-auto">
            {/* 오늘은 화이트데이를 맞아 당신에게 제 마음을 전합니다. */}
          </p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8"
          >
            {/* <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white rounded-full shadow-lg border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-all inline-flex items-center"
            > */}
              {/* <Heart size={18} className="mr-2 text-pink-400" />
              사랑해요
            </motion.button> */}
          </motion.div>
        </motion.div>

        {/* Background image with parallax effect */}
        <div className="absolute inset-0 z-0">
          <motion.div
            style={{
              y: useTransform(scrollYProgress, [0, 0.1], [0, 100]),
              scale: useTransform(scrollYProgress, [0, 0.1], [1, 1.2]),
              opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]),
            }}
            className="w-full h-full"
          >
            <Image 
              src={`https://lh3.googleusercontent.com/d/1N0dqfcO2DqeFCQ-T1vEfyCuDog3Is1AN`} 
              alt="Hero background" 
              fill 
              style={{ objectFit: "cover" }} 
              priority 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-white" />
          </motion.div>
        </div>

        {/* Scroll indicator */}
        {showScrollIndicator && (
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          >
            <ChevronDown size={30} className="text-amber-400" />
            <p className="text-amber-600 text-sm mt-2">아래로 스크롤하세요</p>
          </motion.div>
        )}
      </section>

      {/* Content sections */}
      {sections.map((section, index) => (
        <ParallaxSection
          key={index}
          title={section.title}
          subtitle={section.subtitle}
          message={section.message}
          imageId={section.imageId}
          align={section.align as "left" | "right"}
          index={index}
        />
      ))}

      {/* Final message section */}
      <FinalMessage />
    </main>
  )
}

