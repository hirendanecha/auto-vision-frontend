import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Play, Sparkles, Volume2, VolumeX } from 'lucide-react'

interface DemoVideoModalProps {
  isOpen: boolean
  onClose: () => void
  videoUrl?: string
  previewUrl?: string
  directVideoSrc?: string
}

export function DemoVideoModal({
  isOpen,
  onClose,
  videoUrl = 'https://drive.google.com/file/d/1_0XzJVGh_50UrCzy2XIZyFUIsgldJUpa/view?usp=sharing',
  previewUrl = 'https://drive.google.com/file/d/1_0XzJVGh_50UrCzy2XIZyFUIsgldJUpa/preview',
  directVideoSrc = '/demo.mp4'
}: DemoVideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true) // Muted by default
  const [hasPlaybackError, setHasPlaybackError] = useState(false)

  // Manage video playback, muting by default, ESC key and scroll locking
  useEffect(() => {
    if (!isOpen) {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.currentTime = 0
      }
      return
    }

    // Ensure it starts muted by default upon opening
    setIsMuted(true)
    setHasPlaybackError(false)

    if (videoRef.current) {
      videoRef.current.muted = true
      videoRef.current.play().catch(() => {
        // Autoplay may be restricted on some browsers until user interacts
      })
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = prevOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-4xl rounded-3xl bg-slate-900/95 border border-slate-700/60 shadow-2xl overflow-hidden z-10 text-white flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#984216] flex items-center justify-center text-white shadow-md">
                  <Play className="w-5 h-5 fill-current" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      AutoVision Product Demo
                    </h3>
                    <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#984216]/20 border border-[#984216]/30 text-amber-300 text-[11px] font-semibold">
                      <Sparkles className="w-3 h-3" />
                      Live Walkthrough
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    See AI damage inspection and real-time report generation in action
                  </p>
                </div>
              </div>

              {/* Action Buttons: Mute Toggle + Open in Drive + Close */}
              <div className="flex items-center gap-2">
                {!hasPlaybackError && (
                  <button
                    type="button"
                    onClick={toggleMute}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors border ${
                      isMuted
                        ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                        : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                    }`}
                    title={isMuted ? 'Click to unmute' : 'Click to mute'}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX className="w-4 h-4 text-amber-400" />
                        <span>Muted</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-emerald-400" />
                        <span>Unmuted</span>
                      </>
                    )}
                  </button>
                )}

                <a
                  href={videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 hover:text-white transition-colors border border-slate-700"
                  title="Open video in Google Drive"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Google Drive</span>
                </a>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="relative aspect-video w-full bg-black flex items-center justify-center">
              {!hasPlaybackError ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted={isMuted}
                  playsInline
                  controls
                  onError={() => setHasPlaybackError(true)}
                  className="w-full h-full object-contain"
                >
                  <source src={directVideoSrc} type="video/mp4" />
                  <source
                    src="https://drive.google.com/uc?export=download&id=1_0XzJVGh_50UrCzy2XIZyFUIsgldJUpa"
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <iframe
                  src={previewUrl}
                  title="AutoVision Product Demo Video"
                  className="w-full h-full border-0"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              )}
            </div>

            {/* Modal Footer Note */}
            <div className="px-6 py-3 bg-slate-950/60 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>
                {isMuted ? '🔇 Video is muted by default. Click "Muted" or use player controls to turn on sound.' : '🔊 Audio is playing.'}
              </span>
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#f6dbc6] hover:text-white underline underline-offset-2 transition-colors sm:hidden"
              >
                Open in Drive
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
