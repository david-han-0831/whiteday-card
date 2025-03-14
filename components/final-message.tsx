"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Heart } from "lucide-react"

export default function FinalMessage() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8])

  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen relative flex items-center justify-center bg-gradient-to-b from-white to-amber-50 py-20"
    >
      <motion.div className="text-center max-w-2xl mx-auto px-4" style={{ opacity, scale, y }}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center mx-auto mb-8"
        >
          <Heart size={40} className="text-pink-400" />
        </motion.div>

        <h2 className="text-3xl md:text-5xl font-bold text-amber-800 mb-6">사랑하는 예은아</h2>

        <div className="w-20 h-1 bg-amber-300 mx-auto mb-8 rounded-full"></div>

        <p className="text-amber-700 text-lg mb-8">
          화이트데이를 맞아 짧게 편지를 써봤어.<br/>
          나 만나고 힘들었던 시간들이 있었지만<br/> 그래도 나를 좋아해줘서 너무 너무 감사해.<br/>
          앞으로도 내가 더 많이 많이 잘해줄게.<br/>
          
        </p>

        <p className="text-2xl text-amber-800 font-medium mb-12">사랑해 ❤️</p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 bg-white rounded-full shadow-lg border-2 border-amber-200 text-amber-700 hover:bg-amber-50 transition-all"
          onClick={() => {
            // const audio = new Audio("/audio/kiss-sound.mp3")
            // audio.play()

            // Create heart explosion effect
            const container = document.createElement("div")
            container.style.position = "fixed"
            container.style.top = "0"
            container.style.left = "0"
            container.style.width = "100%"
            container.style.height = "100%"
            container.style.pointerEvents = "none"
            container.style.zIndex = "9999"
            document.body.appendChild(container)

            for (let i = 0; i < 50; i++) {
              const heart = document.createElement("div")
              heart.innerHTML = "❤️"
              heart.style.position = "absolute"
              heart.style.left = "50%"
              heart.style.top = "50%"
              heart.style.fontSize = `${10 + Math.random() * 20}px`
              heart.style.transform = "translate(-50%, -50%)"
              heart.style.pointerEvents = "none"
              container.appendChild(heart)

              const angle = Math.random() * Math.PI * 2
              const distance = 100 + Math.random() * 200
              const duration = 1 + Math.random() * 2

              const animation = heart.animate(
                [
                  {
                    transform: "translate(-50%, -50%)",
                    opacity: 1,
                  },
                  {
                    transform: `translate(calc(-50% + ${Math.cos(angle) * distance}px), calc(-50% + ${Math.sin(angle) * distance}px))`,
                    opacity: 0,
                  },
                ],
                {
                  duration: duration * 1000,
                  easing: "cubic-bezier(0.1, 0.8, 0.2, 1)",
                },
              )

              animation.onfinish = () => {
                heart.remove()
                if (container.childNodes.length === 0) {
                  container.remove()
                }
              }
            }
          }}
        >
          하트 뿅뿅 ❤️❤️
        </motion.button>
      </motion.div>
    </section>
  )
}

