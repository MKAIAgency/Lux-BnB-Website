"use client"

import { useActionState, useEffect, useRef } from "react"
import { KeyRound, AlertTriangle, CheckCircle2 } from "lucide-react"
import { changePasswordAction, type ActionState } from "@/app/admin/actions"

export function ChangePassword() {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    changePasswordAction,
    null,
  )
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset()
    }
  }, [state])

  return (
    <section className="max-w-md">
      <h2 className="flex items-center gap-2 font-serif text-2xl text-foreground">
        <KeyRound className="size-5 text-gold" />
        Change Password
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Update the password used to access this manager.
      </p>

      <form ref={formRef} action={formAction} className="mt-5 space-y-4">
        <Field label="Current Password" name="current" />
        <Field label="New Password" name="next" />
        <Field label="Confirm New Password" name="confirm" />

        {state?.error ? (
          <p className="flex items-center gap-2 text-sm text-destructive">
            <AlertTriangle className="size-4" />
            {state.error}
          </p>
        ) : null}
        {state?.success ? (
          <p className="flex items-center gap-2 text-sm text-gold">
            <CheckCircle2 className="size-4" />
            {state.success}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="rounded-sm bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Updating…" : "Update Password"}
        </button>
      </form>
    </section>
  )
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="password"
        autoComplete="off"
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  )
}
