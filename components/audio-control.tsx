"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { ref as storageRef, getDownloadURL } from "firebase/storage"
import { storage } from "@/lib/firebase"

interface AudioControlProps {
  isMuted: boolean
  toggleMute: () => void
}

const AudioControl = forwardRef<HTMLAudioElement, AudioControlProps>(({ isMuted, toggleMute }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [audioUrl, setAudioUrl] = useState<string>("")

  useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement)

  useEffect(() => {
    const getAudioUrl = async () => {
      try {
        // Firebase Storage의 오디오 파일 경로
        const fileRef = storageRef(storage, "audio/whiteday.mp3")
        const url = await getDownloadURL(fileRef)
        setAudioUrl(url)
        console.log("오디오 URL 로드 성공:", url)
      } catch (error) {
        console.error("Error loading audio:", error)
      }
    }

    getAudioUrl()
  }, [])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 1
    }
  }, [isMuted])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleUserInteraction = async () => {
      try {
        if (audio.paused && audioUrl) {
          await audio.play()
        }
        document.removeEventListener("click", handleUserInteraction)
        document.removeEventListener("touchstart", handleUserInteraction)
      } catch (error) {
        console.error("Audio playback failed:", error)
      }
    }

    document.addEventListener("click", handleUserInteraction)
    document.addEventListener("touchstart", handleUserInteraction)

    return () => {
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
      audio.pause()
    }
  }, [audioUrl])

  return (
    <div className="relative">
      {audioUrl && (
        <audio
          ref={audioRef}
          src={audioUrl}
          loop
          preload="auto"
          onError={(e) => console.error("Audio error:", e)}
        />
      )}
      <button
        onClick={toggleMute}
        className="p-3 bg-white/80 backdrop-blur rounded-full shadow-lg hover:bg-white transition-all"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-amber-600" />
        ) : (
          <Volume2 className="w-6 h-6 text-amber-600" />
        )}
      </button>
    </div>
  )
})

AudioControl.displayName = "AudioControl"

export default AudioControl

