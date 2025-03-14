"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react"
import { Music, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  isMuted: boolean
  toggleMute: () => void
}

const AudioPlayer = forwardRef<HTMLAudioElement, AudioPlayerProps>(({ isMuted, toggleMute }, ref) => {
  const audioRef = useRef<HTMLAudioElement>(null)

  useImperativeHandle(ref, () => audioRef.current as HTMLAudioElement)

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
        if (audio.paused) {
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
  }, [])

  return (
    <div className="flex items-center bg-white/80 p-2 rounded-full shadow-md">
      <Music size={18} className="text-amber-500 mr-2" />
      <audio 
        ref={audioRef} 
        src="/audio/whiteday.mp3" 
        loop 
        preload="auto"
        onError={(e) => console.error("Audio error:", e)}
      />
      <button onClick={toggleMute} className="hover:bg-amber-50 p-1 rounded-full">
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  )
})

AudioPlayer.displayName = "AudioPlayer"

export default AudioPlayer

