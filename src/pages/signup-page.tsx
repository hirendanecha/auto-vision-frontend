import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/auth-context'
import { nodeApiUrl } from '../api/node-base-url'
import { CarLoader } from '../components/ui/loader'
import { ProjectShowcase } from '../components/auth/project-showcase'

export function SignupPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      const res = await fetch(nodeApiUrl('/auth/register'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'user' })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.msg || 'Registration failed')
      login(data.user, data.token)
      navigate('/')
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl min-h-[85vh] flex items-center justify-center px-4 py-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch w-full">
        {/* Left: Interactive Project Description & Repositories */}
        <div className="glass-card p-6 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between">
          <ProjectShowcase />
        </div>

        {/* Right: Existing Signup Form Card */}
        <div className="glass-card w-full p-6 sm:p-8 lg:p-10 lg:col-span-5 flex flex-col justify-center">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#984216] rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4">
              <span className="text-white font-bold text-3xl">A</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Join the AutoVision platform today</p>
          </div>
          
          <form onSubmit={handleSignup} className="space-y-4">
            {error && <div className="p-3 rounded-xl bg-red-50 text-red-600 text-sm font-bold border border-red-100">{error}</div>}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
              <input 
                placeholder="John Doe" 
                className="input-glass w-full h-12"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
              <input 
                placeholder="name@company.com" 
                type="email" 
                className="input-glass w-full h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Password</label>
              <input 
                placeholder="••••••••" 
                type="password" 
                className="input-glass w-full h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoading}
              />
            </div>
            
            <button type="submit" className="button-primary w-full h-12 mt-4 font-black text-lg shadow-xl" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 mt-6">
            Already have an account?{' '}
            <Link className="font-bold text-[#984216] hover:text-[#823812] transition-colors" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {isLoading && (
        <CarLoader 
          message="Creating Account" 
          description="Registering your AutoVision credentials and setting up your workspace..." 
        />
      )}
    </div>
  )
}
