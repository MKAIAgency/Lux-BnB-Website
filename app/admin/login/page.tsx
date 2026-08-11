import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { LoginForm } from "@/components/admin/login-form"

export const metadata = {
  title: "Admin Sign In | LUX BNB",
  robots: { index: false, follow: false },
}

export default async function LoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin")
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="font-serif text-3xl font-semibold text-foreground">
            LUX <span className="text-gold">BNB</span>
          </span>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Property Management
          </p>
        </div>
        <LoginForm />
      </div>
    </main>
  )
}
