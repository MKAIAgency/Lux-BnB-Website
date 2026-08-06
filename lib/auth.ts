import "server-only"
import { cookies } from "next/headers"
import { getSessionToken } from "@/lib/store"

const COOKIE_NAME = "lux_admin"

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  const cookieValue = store.get(COOKIE_NAME)?.value
  if (!cookieValue) return false
  const token = await getSessionToken()
  return cookieValue === token
}

export async function createSession(): Promise<void> {
  const store = await cookies()
  const token = await getSessionToken()
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  })
}

export async function destroySession(): Promise<void> {
  const store = await cookies()
  store.delete(COOKIE_NAME)
}
