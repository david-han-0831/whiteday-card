"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  duration: number
  delay: number
  type: "circle" | "square" | "triangle"
  color: string
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const colors = ["bg-amber-100", "bg-amber-200", "bg-yellow-100", "bg-yellow-200", "bg-white"]

    const types: ("circle" | "square" | "triangle")[] = ["circle", "square", "triangle"]

    // Create initial particles
    const initialParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random x position (0-100%)
      y: Math.random() * 100, // random y position (0-100%)
      size: 5 + Math.random() * 15, // random size (5-20px)
      rotation: Math.random() * 360, // random rotation
      duration: 60 + Math.random() * 60, // random duration (60-120s)
      delay: Math.random() * 10, // random delay (0-10s)
      type: types[Math.floor(Math.random() * types.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setParticles(initialParticles)

    // Add new particles periodically
    const interval = setInterval(() => {
      setParticles((prevParticles) => [
        ...prevParticles.slice(-40), // Keep only the last 40 particles
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: -10, // Start from top
          size: 5 + Math.random() * 15,
          rotation: Math.random() * 360,
          duration: 60 + Math.random() * 60,
          delay: 0,
          type: types[Math.floor(Math.random() * types.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
        },
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const renderParticle = (type: string, color: string) => {
    switch (type) {
      case "circle":
        return <div className={`w-full h-full rounded-full ${color} opacity-60`} />
      case "square":
        return <div className={`w-full h-full ${color} opacity-60`} />
      case "triangle":
        return (
          <div className="w-full h-full overflow-hidden">
            <div
              className={`w-full h-full ${color} opacity-60`}
              style={{
                clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
              }}
            />
          </div>
        )
      default:
        return <div className={`w-full h-full rounded-full ${color} opacity-60`} />
    }
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute"
          initial={{
            x: `${particle.x}vw`,
            y: `${particle.y}vh`,
            rotate: particle.rotation,
          }}
          animate={{
            x: `${particle.x + (Math.random() * 20 - 10)}vw`,
            y: `${particle.y + 110}vh`,
            rotate: particle.rotation + 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: "linear",
          }}
          style={{
            width: particle.size,
            height: particle.size,
          }}
        >
          {renderParticle(particle.type, particle.color)}
        </motion.div>
      ))}
    </div>
  )
}

