"use client"

import { useActionState } from "react"
import { Lock } from "lucide-react"
import { loginAction, type ActionState } from "@/app/admin/actions"

export function LoginForm() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    loginAction,
    null,
  )

  return (
    <form
      action={formAction}
      className="rounded-lg border border-border bg-card p-6 shadow-2xl shadow-black/30"
    >
      <label
        htmlFor="password"
        className="mb-2 block text-xs uppercase tracking-[0.2em] text-muted-foreground"
      >
        Password
      </label>
      <div className="relative">
        <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gold" />
        <input
          id="password"
          name="password"
          type="password"
          autoFocus
          autoComplete="current-password"
          className="w-full rounded-sm border border-input bg-background py-3 pl-10 pr-3 text-sm text-foreground outline-none transition-colors focus:border-gold"
          placeholder="Enter admin password"
        />
      </div>

      {state?.error ? (
        <p className="mt-3 text-sm text-destructive">{state.error}</p>
      ) : null}

      <button
        type="submit"
        disabled={pending}
        className="mt-5 w-full rounded-sm bg-gold py-3 text-sm font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign In"}
      </button>
    </form>
  )
}
