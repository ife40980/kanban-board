'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSignInEmailPassword } from '@nhost/react'
import { nhost } from '@/lib/nhost'

export default function LoginPage() {
  const router = useRouter()
  const { signInEmailPassword, isLoading, error } =
    useSignInEmailPassword()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [debug, setDebug] = useState<string[]>([])
  const [needsEmailVerificationFlag, setNeedsEmailVerificationFlag] = useState(false)
  const [isResending, setIsResending] = useState(false)

  async function handleSignIn() {
    setDebug([])

    const result = await signInEmailPassword(email, password)
    setDebug((d) => [...d, 'signIn result:', JSON.stringify(result)])

    if (result?.needsEmailVerification) {
      setNeedsEmailVerificationFlag(true)
      return
    }

    const session = await nhost.auth.getSession()
    setDebug((d) => [...d, 'session after signIn:', JSON.stringify(session)])

    if (session?.accessToken) {
      router.push('/boards')
    }
  }

  async function resendVerification() {
    setIsResending(true)
    try {
      const res = await nhost.auth.sendVerificationEmail({ email })
      setDebug((d) => [...d, 'resend result:', JSON.stringify(res)])
    } catch (err) {
      setDebug((d) => [...d, 'resend error:', String(err)])
    } finally {
      setIsResending(false)
    }
  }

  return (
    <main className="max-w-sm mx-auto mt-10 space-y-4">
        <h1 className="text-xl font-semibold">Sign in</h1>

        <input
          className="border p-2 w-full"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />

        <input
          className="border p-2 w-full"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />

        {needsEmailVerificationFlag ? (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm">A verification email was sent to <strong>{email}</strong>. Please check your inbox and click the verification link, then sign in again.</p>
            <div className="mt-3 flex gap-2">
              <button
                className="bg-gray-800 text-white px-3 py-1"
                onClick={resendVerification}
                disabled={isResending}
              >
                {isResending ? 'Resending…' : 'Resend verification email'}
              </button>
            </div>
          </div>
        ) : (
        <button
          className="bg-black text-white px-4 py-2 w-full"
          onClick={handleSignIn}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
        )}

        {error && <p className="text-red-600">{error.message}</p>}

        <pre className="bg-gray-100 p-2 text-xs whitespace-pre-wrap">
          {debug.join('\n')}
        </pre>
      </main>
  )
}
