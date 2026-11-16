import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Cpu, 
  Layers, 
  Server, 
  Terminal,
  Sparkles
} from 'lucide-react'

// Official GitHub Octocat SVG
function GitHubIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  )
}

interface Repository {
  id: string
  name: string
  role: string
  description: string
  cloneUrl: string
  webUrl: string
  icon: typeof Cpu
  badgeColor: string
  techStack: string[]
  highlights: string[]
}

const REPOSITORIES: Repository[] = [
  {
    id: 'backend',
    name: 'auto-vision-backend',
    role: 'AI / CV Inference Engine',
    description: 'YOLO ONNX deep learning pipeline for real-time car damage detection, segmentation, and bbox localization.',
    cloneUrl: 'https://github.com/sarthaknimbark/auto-vision-backend.git',
    webUrl: 'https://github.com/sarthaknimbark/auto-vision-backend',
    icon: Cpu,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    techStack: ['Python', 'YOLO ONNX', 'FastAPI', 'OpenCV'],
    highlights: ['ONNX Runtime Optimization', 'Instant Polygon Masks', 'Multi-class Damage']
  },
  {
    id: 'frontend',
    name: 'auto-vision-frontend',
    role: 'Client & 3D Interactive UI',
    description: 'Modern reactive web dashboard with 3D model visualization, inspection upload workflow, and PDF report export.',
    cloneUrl: 'https://github.com/sarthaknimbark/auto-vision-frontend.git',
    webUrl: 'https://github.com/sarthaknimbark/auto-vision-frontend',
    icon: Layers,
    badgeColor: 'bg-orange-100 text-[#984216] border-orange-200',
    techStack: ['React 19', 'TypeScript', 'Three.js', 'Tailwind CSS'],
    highlights: ['Interactive 3D Car Model', 'Instant PDF Reports', 'Tailwind Design System']
  },
  {
    id: 'node',
    name: 'auto-vision-node',
    role: 'Core Backend & Auth API',
    description: 'Secure REST microservice handling JWT authentication, user role permissions, and damage audit log records.',
    cloneUrl: 'https://github.com/sarthaknimbark/auto-vision-node.git',
    webUrl: 'https://github.com/sarthaknimbark/auto-vision-node',
    icon: Server,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    techStack: ['Node.js', 'Express', 'JWT Auth', 'MongoDB'],
    highlights: ['RBAC Authorization', 'Inspection Audit Logs', 'Secure Token Gateway']
  }
]

export function ProjectShowcase() {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [activeRepoId, setActiveRepoId] = useState<string>('backend')

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2200)
    } catch {
      // Fallback
      const textArea = document.createElement('textarea')
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2200)
    }
  }

  const activeRepo = REPOSITORIES.find((r) => r.id === activeRepoId) || REPOSITORIES[0]

  return (
    <div className="flex flex-col justify-between h-full space-y-6">
      {/* Top Banner & Project Intro */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#984216]/10 border border-[#984216]/20 text-[#984216] text-xs font-bold tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Full-Stack AI Ecosystem</span>
        </div>

        <div className="space-y-2">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-snug">
            AI-Driven Vehicle <br />
            <span className="heading-gradient">Damage Inspection</span>
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            AutoVision is an end-to-end computer vision platform that automates vehicle inspection. 
            Powered by high-precision ONNX deep learning models, distributed node microservices, 
            and an interactive 3D client dashboard.
          </p>
        </div>

        {/* Key Metrics / Highlights Pills */}
        <div className="grid grid-cols-3 gap-2.5 pt-1">
          <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-xs">
            <div className="text-base font-black text-[#984216]">3 Repos</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Modular Architecture</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-xs">
            <div className="text-base font-black text-slate-900">YOLO ONNX</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">AI Detection</div>
          </div>
          <div className="p-2.5 rounded-xl bg-white/70 border border-slate-200/80 shadow-xs">
            <div className="text-base font-black text-slate-900">3D Vision</div>
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Three.js UI</div>
          </div>
        </div>
      </div>

      {/* Interactive Repositories Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitHubIcon className="w-4 h-4 text-slate-800" />
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Source Repositories
            </span>
          </div>
          <span className="text-[11px] font-medium text-slate-500">Click to explore & copy</span>
        </div>

        {/* Interactive Repo Cards */}
        <div className="space-y-2.5">
          {REPOSITORIES.map((repo) => {
            const Icon = repo.icon
            const isSelected = activeRepoId === repo.id
            const isCopied = copiedId === repo.id

            return (
              <div
                key={repo.id}
                onClick={() => setActiveRepoId(repo.id)}
                className={`group relative rounded-2xl p-3.5 transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-white border-[#984216]/40 shadow-md ring-2 ring-[#984216]/10'
                    : 'bg-white/60 hover:bg-white/90 border-slate-200/70 hover:border-[#984216]/30 shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isSelected ? 'bg-[#984216] text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm group-hover:text-[#984216] transition-colors">
                          {repo.name}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold border ${repo.badgeColor}`}>
                          {repo.role}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {repo.description}
                      </p>
                    </div>
                  </div>

                  {/* Actions: Copy Clone Link & External GitHub Link */}
                  <div className="flex items-center gap-1.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(repo.cloneUrl, repo.id)}
                      title="Copy Git Clone URL"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#984216] hover:bg-[#984216]/10 transition-colors relative"
                    >
                      {isCopied ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      {isCopied && (
                        <span className="absolute -top-7 right-0 px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-bold shadow-md whitespace-nowrap animate-in fade-in zoom-in-95">
                          Copied!
                        </span>
                      )}
                    </button>

                    <a
                      href={repo.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Open in GitHub"
                      className="p-1.5 rounded-lg text-slate-500 hover:text-[#984216] hover:bg-[#984216]/10 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Expanded Details when active */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 pt-3 border-t border-slate-100 overflow-hidden"
                    >
                      <div className="flex flex-wrap items-center gap-1.5">
                        {repo.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>

      {/* Interactive Quick Clone Snippet */}
      <div className="rounded-xl bg-slate-900 text-slate-200 p-3 shadow-md border border-slate-800">
        <div className="flex items-center justify-between text-xs font-mono mb-1.5 text-slate-400">
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-[#984216]" />
            <span>git clone</span>
          </div>
          <button
            type="button"
            onClick={() => copyToClipboard(`git clone ${activeRepo.cloneUrl}`, 'cli')}
            className="flex items-center gap-1 text-[11px] text-slate-300 hover:text-white transition-colors"
          >
            {copiedId === 'cli' ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div className="font-mono text-xs text-amber-300/90 truncate select-all">
          git clone {activeRepo.cloneUrl}
        </div>
      </div>
    </div>
  )
}
