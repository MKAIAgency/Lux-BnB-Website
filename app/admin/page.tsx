import { redirect } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"
import { getProperties } from "@/lib/store"
import { logoutAction } from "@/app/admin/actions"
import { PropertyManager } from "@/components/admin/property-manager"
import { ChangePassword } from "@/components/admin/change-password"

export const metadata = {
  title: "Property Manager | LUX BNB",
  robots: { index: false, follow: false },
}

export default async function AdminPage() {
  if (!(await isAuthenticated())) {
    redirect("/admin/login")
  }
  const properties = await getProperties()

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-xl font-semibold text-foreground">
              LUX <span className="text-gold">BNB</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Property Manager
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
            >
              View Site
            </a>
            <form action={logoutAction}>
              <button
                type="submit"
                className="rounded-sm border border-border px-4 py-2 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:border-gold hover:text-gold"
              >
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-10">
        <PropertyManager properties={properties} />
        <div className="mt-16 border-t border-border/60 pt-10">
          <ChangePassword />
        </div>
      </div>
    </main>
  )
}
