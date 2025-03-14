"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  color: string
  rotation: number
  size: number
  delay: number
}

const colors = ["bg-yellow-200", "bg-yellow-300", "bg-amber-200", "bg-amber-300", "bg-white", "bg-pink-200"]

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    // Create confetti pieces
    const newPieces = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position (0-100%)
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360, // random rotation
      size: 5 + Math.random() * 10, // random size (5-15px)
      delay: Math.random() * 0.5, // random delay (0-0.5s)
    }))

    setPieces(newPieces)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className={`absolute top-0 ${piece.color} rounded-sm`}
          style={{
            left: `${piece.x}vw`,
            width: piece.size,
            height: piece.size * (Math.random() * 0.5 + 0.5), // slightly rectangular
          }}
          initial={{
            y: "-10vh",
            rotate: piece.rotation,
            opacity: 1,
          }}
          animate={{
            y: "100vh",
            rotate: piece.rotation + (Math.random() > 0.5 ? 360 : -360) * 2,
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            delay: piece.delay,
            ease: [0.1, 0.25, 0.3, 1],
            times: [0, 0.7, 1],
          }}
        />
      ))}
    </div>
  )
}

