"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Snowflake {
  id: number
  x: number
  size: number
  delay: number
  duration: number
  opacity: number
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      size: 3 + Math.random() * 8, // random size (3-11px)
      delay: Math.random() * 10, // random delay (0-10s)
      duration: 15 + Math.random() * 25, // random duration (15-40s)
      opacity: 0.3 + Math.random() * 0.5, // random opacity (0.3-0.8)
    }))

    setSnowflakes(initialSnowflakes)

    // Add new snowflakes periodically
    const interval = setInterval(() => {
      setSnowflakes((prevSnowflakes) => [
        ...prevSnowflakes.slice(-80), // Keep only the last 80 snowflakes
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: 3 + Math.random() * 8,
          delay: 0,
          duration: 15 + Math.random() * 25,
          opacity: 0.3 + Math.random() * 0.5,
        },
      ])
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((snowflake) => (
        <motion.div
          key={snowflake.id}
          className="absolute top-0 rounded-full bg-white"
          style={{
            left: `${snowflake.x}vw`,
            width: snowflake.size,
            height: snowflake.size,
            opacity: snowflake.opacity,
          }}
          initial={{ y: "-10vh" }}
          animate={{
            y: "100vh",
            x: [
              `${snowflake.x}vw`,
              `${snowflake.x + (Math.random() * 10 - 5)}vw`,
              `${snowflake.x - (Math.random() * 10 - 5)}vw`,
              `${snowflake.x}vw`,
            ],
          }}
          transition={{
            duration: snowflake.duration,
            delay: snowflake.delay,
            ease: "linear",
            times: [0, 0.33, 0.66, 1],
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}
    </div>
  )
}

