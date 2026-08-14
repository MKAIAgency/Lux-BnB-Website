import "server-only"
import crypto from "crypto"
import { asc, eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { luxProperties, luxSettings } from "@/lib/db/schema"

export type Property = {
  id: string
  name: string
  location: string
  image: string
  beds: string
  baths: string
  sqft: string
  tag: string
  enquireLink: string
}

const DEFAULT_PASSWORD = "050826"
const SESSION_KEY = "admin_session_token"

function toProperty(row: typeof luxProperties.$inferSelect): Property {
  return {
    id: row.id,
    name: row.name,
    location: row.location,
    image: row.image,
    beds: row.beds,
    baths: row.baths,
    sqft: row.sqft,
    tag: row.tag,
    enquireLink: row.enquireLink,
  }
}

function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || crypto.randomUUID().slice(0, 8)
  )
}

export const getProperties = async (): Promise<Property[]> => {
  const rows = await db.select().from(luxProperties).orderBy(asc(luxProperties.createdAt))
  return rows.map(toProperty)
}

export async function getProperty(id: string): Promise<Property | undefined> {
  const rows = await db.select().from(luxProperties).where(eq(luxProperties.id, id)).limit(1)
  return rows[0] ? toProperty(rows[0]) : undefined
}

export type PropertyInput = Omit<Property, "id">

export async function createProperty(input: PropertyInput): Promise<Property> {
  let id = slugify(input.name)
  const existing = await db.select({ id: luxProperties.id }).from(luxProperties).where(eq(luxProperties.id, id)).limit(1)
  if (existing.length) id = `${id}-${crypto.randomUUID().slice(0, 4)}`
  const rows = await db.insert(luxProperties).values({ id, ...input }).returning()
  return toProperty(rows[0])
}

export async function updateProperty(id: string, input: PropertyInput): Promise<void> {
  await db.update(luxProperties).set({ ...input, updatedAt: new Date() }).where(eq(luxProperties.id, id))
}

export async function deleteProperty(id: string): Promise<void> {
  await db.delete(luxProperties).where(eq(luxProperties.id, id))
}

async function getSetting(key: string): Promise<string | undefined> {
  const rows = await db.select({ value: luxSettings.value }).from(luxSettings).where(eq(luxSettings.key, key)).limit(1)
  return rows[0]?.value
}

async function setSetting(key: string, value: string): Promise<void> {
  await db.insert(luxSettings).values({ key, value, updatedAt: new Date() }).onConflictDoUpdate({
    target: luxSettings.key,
    set: { value, updatedAt: new Date() },
  })
}

export async function verifyPassword(password: string): Promise<boolean> {
  let stored = await getSetting("admin_password")
  if (!stored) {
    stored = DEFAULT_PASSWORD
    await setSetting("admin_password", stored)
  }
  return stored === password
}

export async function changePassword(next: string): Promise<void> {
  await setSetting("admin_password", next)
}

export async function getSessionToken(): Promise<string> {
  let token = await getSetting(SESSION_KEY)
  if (!token) {
    token = crypto.randomUUID()
    await setSetting(SESSION_KEY, token)
  }
  return token
}
