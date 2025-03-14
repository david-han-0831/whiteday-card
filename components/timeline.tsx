"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface TimelineItem {
  title: string
  date: string
  content: string
  image: string
}

interface TimelineProps {
  items: TimelineItem[]
  activeIndex: number
  setActiveIndex: (index: number) => void
}

export default function Timeline({ items, activeIndex, setActiveIndex }: TimelineProps) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean[]>(Array(items.length).fill(false))

  const handleImageLoad = (index: number) => {
    setIsImageLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  // Auto advance through timeline
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % items.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [activeIndex, items.length, setActiveIndex])

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-amber-200 rounded-full" />

      {/* Timeline items */}
      <div className="relative">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className={`mb-24 md:mb-32 relative ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}
          >
            {/* Timeline dot */}
            <div
              className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-4 border-amber-200 cursor-pointer transition-all duration-300 z-10
                ${activeIndex === index ? "bg-amber-400 scale-125" : "bg-white"}`}
              onClick={() => setActiveIndex(index)}
            />

            {/* Content container */}
            <div className="md:grid md:grid-cols-2 gap-8 items-center">
              {/* Text content - alternating sides */}
              <div className={`mb-6 md:mb-0 ${index % 2 === 0 ? "md:order-1" : "md:order-2"}`}>
                <div
                  className={`bg-white p-6 rounded-xl shadow-md border-2 border-amber-100 transform transition-all duration-500
                  ${activeIndex === index ? "scale-105 border-amber-300" : "scale-100"}`}
                >
                  <div className="text-amber-500 font-medium mb-1">{item.date}</div>
                  <h3 className="text-xl md:text-2xl font-bold text-amber-800 mb-3">{item.title}</h3>
                  <p className="text-amber-700">{item.content}</p>
                </div>
              </div>

              {/* Image - alternating sides */}
              <div className={`${index % 2 === 0 ? "md:order-2" : "md:order-1"}`}>
                <div
                  className={`relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500
                  ${activeIndex === index ? "scale-105" : "scale-100"}`}
                >
                  <div className="absolute inset-0 bg-amber-200 animate-pulse flex items-center justify-center">
                    {!isImageLoaded[index] && <span className="text-amber-700">Loading image...</span>}
                  </div>
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    style={{ objectFit: "cover" }}
                    onLoad={() => handleImageLoad(index)}
                    className={`transition-opacity duration-500 ${isImageLoaded[index] ? "opacity-100" : "opacity-0"}`}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline navigation */}
      <div className="flex justify-center mt-8 space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeIndex ? "bg-amber-400 scale-125" : "bg-amber-200"
            }`}
          />
        ))}
      </div>
    </div>
  )
}

