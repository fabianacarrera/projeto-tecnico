'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, Mail, Lock, Loader2 } from 'lucide-react'
import { toast, Toaster } from 'sonner'
import { validateName, validateEmail, validatePassword } from '@/lib/validation'

interface FormErrors {
  name?: string
  email?: string
  password?: string
}

export default function Register() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    const nameError = validateName(name)
    const emailError = validateEmail(email)
    const passwordError = validatePassword(password)

    if (nameError || emailError || passwordError) {
      setErrors({
        name: nameError,
        email: emailError,
        password: passwordError,
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api'}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        localStorage.setItem('token', data.token)
        toast.success('Cadastro realizado com sucesso!')
        router.push('/login')
      } else {
        toast.error(data.message || 'Erro ao cadastrar')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Erro de conexão. Tente novamente.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Toaster position="top-center" richColors closeButton />
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-zinc-200 p-8">
          <h1 className="text-3xl font-semibold text-zinc-900 mb-2 text-center">
            Cadastro
          </h1>
          <p className="text-sm text-zinc-600 mb-6 text-center">
            Crie sua conta para começar
          </p>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">
                Nome
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                    setErrors((prev) => ({ ...prev, name: undefined }))
                  }}
                  onBlur={() => {
                    const error = validateName(name)
                    if (error) setErrors((prev) => ({ ...prev, name: error }))
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Nome"
                  disabled={isLoading}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                />
              </div>
              {errors.name && (
                <p id="name-error" className="text-sm text-red-600 mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setErrors((prev) => ({ ...prev, email: undefined }))
                  }}
                  onBlur={() => {
                    const error = validateEmail(email)
                    if (error) setErrors((prev) => ({ ...prev, email: error }))
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Email"
                  disabled={isLoading}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-sm text-red-600 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setErrors((prev) => ({ ...prev, password: undefined }))
                  }}
                  onBlur={() => {
                    const error = validatePassword(password)
                    if (error) setErrors((prev) => ({ ...prev, password: error }))
                  }}
                  className="w-full h-12 pl-10 pr-4 rounded-lg border border-zinc-300 bg-white text-zinc-900 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  placeholder="Senha"
                  disabled={isLoading}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                />
              </div>
              {errors.password && (
                <p id="password-error" className="text-sm text-red-600 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Cadastrando...
                </>
              ) : (
                'Cadastrar'
              )}
            </button>
          </form>

          <div className="text-sm text-center text-zinc-600 mt-6">
            Já tem conta?{' '}
            <Link
              href="/login"
              className="text-purple-600 hover:text-purple-700 font-medium transition-colors"
            >
              Faça login
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
