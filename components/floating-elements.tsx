"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface FloatingElement {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  type: "heart" | "circle" | "star"
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    // Create initial elements
    const types: ("heart" | "circle" | "star")[] = ["heart", "circle", "star"]
    const initialElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position (0-100%)
      y: Math.random() * 100, // random y position (0-100%)
      size: 10 + Math.random() * 15, // random size (10-25px)
      rotation: Math.random() * 360, // random rotation
      duration: 20 + Math.random() * 40, // random duration (20-60s)
      delay: Math.random() * 5, // random delay (0-5s)
      type: types[Math.floor(Math.random() * types.length)],
    }))

    setElements(initialElements)

    // Add new elements periodically
    const interval = setInterval(() => {
      setElements((prevElements) => [
        ...prevElements.slice(-30), // Keep only the last 30 elements
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 10 + Math.random() * 15,
          rotation: Math.random() * 360,
          duration: 20 + Math.random() * 40,
          delay: 0,
          type: types[Math.floor(Math.random() * types.length)],
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const renderElement = (type: string) => {
    switch (type) {
      case "heart":
        return "❤"
      case "star":
        return "✨"
      case "circle":
        return "●"
      default:
        return "●"
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute text-amber-100 opacity-30"
          initial={{
            x: `${element.x}vw`,
            y: `${element.y}vh`,
            rotate: element.rotation,
            scale: 0,
          }}
          animate={{
            x: `${element.x + (Math.random() * 10 - 5)}vw`,
            y: `${element.y + (Math.random() * 10 - 5)}vh`,
            rotate: element.rotation + 360,
            scale: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            ease: "easeInOut",
            times: [0, 0.2, 0.8, 1],
          }}
          style={{ fontSize: element.size }}
        >
          {renderElement(element.type)}
        </motion.div>
      ))}
    </div>
  )
}

