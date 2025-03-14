"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Heart {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      delay: Math.random() * 10, // random delay (0-10s)
      duration: 15 + Math.random() * 20, // random duration (15-35s)
      size: 10 + Math.random() * 20, // random size (10-30px)
      opacity: 0.1 + Math.random() * 0.5, // random opacity (0.1-0.6)
    }))

    setHearts(initialHearts)

    // Add new hearts periodically
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          x: Math.random() * 100,
          delay: 0,
          duration: 15 + Math.random() * 20,
          size: 10 + Math.random() * 20,
          opacity: 0.1 + Math.random() * 0.5,
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-amber-200"
          initial={{
            x: `${heart.x}vw`,
            y: "100vh",
            opacity: heart.opacity,
            scale: 0.5,
          }}
          animate={{
            y: "-100vh",
            opacity: [heart.opacity, heart.opacity, 0],
            rotate: [0, 10, -10, 5, 0],
            scale: [0.5, 1, 0.8],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            times: [0, 0.8, 1],
          }}
          style={{ fontSize: heart.size }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}

