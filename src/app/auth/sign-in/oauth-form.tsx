'use client'

import { FormEvent, useState } from 'react'
import { AuthApiError } from '@supabase/supabase-js'
import { Info, Zap } from 'lucide-react'
import { z, ZodError } from 'zod'

import { useSupabase } from '@/app/supabase-provider'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AuthUserSchema } from '@/lib/auth-validation/validationSchema'
import { formatError } from '@/lib/error'

type FormData = z.infer<typeof AuthUserSchema>

function InputErrorMessage({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
      {children}
    </span>
  )
}

export function OTPForm() {
  const { supabase } = useSupabase()
  const [errors, setErrors] = useState<FormData>()
  const [message, setMessage] = useState<string>('')
  const [formSuccess, setFormSuccess] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    email: '',
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // reset all states
    setFormSuccess(false)
    setErrors(undefined)
    setMessage('')

    const email = formData.email

    try {
      AuthUserSchema.parse({ email })
    } catch (err) {
      if (err instanceof ZodError) {
        const errs = formatError(err) as FormData
        setErrors(errs)
        return
      }
    }

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${new URL(location.href).origin}/auth/callback?next=shop`,
      },
    })

    if (error) {
      if (error instanceof AuthApiError && error.status === 400) {
        setMessage('Invalid credentials.')
        return
      }
      setMessage(error.message)
      return
    }

    // reset form
    setFormData({ email: '' })
    setFormSuccess(true)
    setMessage('Please check your inbox for a magic link.')
  }
  return (
    <div className=" max-w-xs">
      {message ? (
        <Alert variant={formSuccess ? 'success' : 'destructive'} className="mb-10">
          {formSuccess ? (
            <Zap className="h-4 w-4 stroke-gray-400" />
          ) : (
            <Info className="h-4 w-4 text-red-400" />
          )}
          <Zap className="h-4 w-4" />
          <AlertTitle>Info</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Sign in</Label>
          <Input
            id="email"
            name="email"
            type="text"
            value={formData?.email ?? ''}
            onChange={(ev) => setFormData({ ...formData, email: ev.target.value })}
          />
        </div>
        {errors?.email ? <InputErrorMessage>{errors?.email}</InputErrorMessage> : null}
        <div className="form-control mt-6 w-full">
          <Button className="btn btn-primary w-full no-animation">Enter the Meathead</Button>
        </div>
      </form>
    </div>
  )
}
