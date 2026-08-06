import "server-only"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

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

type Database = {
  password: string
  sessionToken: string
  properties: Property[]
}

const DATA_DIR = path.join(process.cwd(), "data")
const DB_PATH = path.join(DATA_DIR, "db.json")

const SEED_PROPERTIES: Property[] = [
  {
    id: "the-address",
    name: "The Address",
    location: "Jumeirah Beach Residences",
    image: "/images/property-beach-villa.png",
    beds: "3.5",
    baths: "4",
    sqft: "2,000",
    tag: "Palm & Sea Views",
    enquireLink: "",
  },
  {
    id: "jbr-penthouse",
    name: "Penthouse",
    location: "Jumeirah Beach Residences",
    image: "/images/property-skyvilla.png",
    beds: "4",
    baths: "4",
    sqft: "6,000",
    tag: "Private Pool · Ocean Views",
    enquireLink: "",
  },
  {
    id: "princess-tower",
    name: "Princess Tower",
    location: "Dubai Marina",
    image: "/images/property-marina.png",
    beds: "3",
    baths: "3",
    sqft: "2,100",
    tag: "Ocean & Palm Views",
    enquireLink: "",
  },
  {
    id: "opera-grand",
    name: "Opera Grand",
    location: "Dubai Opera · Downtown",
    image: "/images/property-penthouse.png",
    beds: "3.5",
    baths: "4.5",
    sqft: "2,000",
    tag: "Burj Khalifa & Fountain Views",
    enquireLink: "",
  },
  {
    id: "anantara-residences",
    name: "Anantara Residences",
    location: "Palm Jumeirah",
    image: "/images/property-desert.png",
    beds: "1.5",
    baths: "1.5",
    sqft: "1,100",
    tag: "Palm & Sea Views",
    enquireLink: "",
  },
  {
    id: "29-blvd",
    name: "29 BLVD",
    location: "Downtown",
    image: "/images/property-bedroom.png",
    beds: "1",
    baths: "1",
    sqft: "850",
    tag: "Burj Khalifa Views",
    enquireLink: "",
  },
]

async function readDb(): Promise<Database> {
  try {
    const raw = await fs.readFile(DB_PATH, "utf-8")
    const parsed = JSON.parse(raw) as Partial<Database>
    return {
      password: parsed.password ?? "050826",
      sessionToken: parsed.sessionToken ?? crypto.randomUUID(),
      properties: parsed.properties ?? SEED_PROPERTIES,
    }
  } catch {
    const seeded: Database = {
      password: "050826",
      sessionToken: crypto.randomUUID(),
      properties: SEED_PROPERTIES,
    }
    await writeDb(seeded)
    return seeded
  }
}

async function writeDb(db: Database): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf-8")
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

export async function getProperties(): Promise<Property[]> {
  const db = await readDb()
  return db.properties
}

export async function getProperty(id: string): Promise<Property | undefined> {
  const db = await readDb()
  return db.properties.find((p) => p.id === id)
}

export type PropertyInput = Omit<Property, "id">

export async function createProperty(input: PropertyInput): Promise<Property> {
  const db = await readDb()
  let id = slugify(input.name)
  // Ensure a unique id.
  while (db.properties.some((p) => p.id === id)) {
    id = `${id}-${crypto.randomUUID().slice(0, 4)}`
  }
  const property: Property = { id, ...input }
  db.properties.push(property)
  await writeDb(db)
  return property
}

export async function updateProperty(
  id: string,
  input: PropertyInput,
): Promise<void> {
  const db = await readDb()
  const idx = db.properties.findIndex((p) => p.id === id)
  if (idx === -1) return
  db.properties[idx] = { id, ...input }
  await writeDb(db)
}

export async function deleteProperty(id: string): Promise<void> {
  const db = await readDb()
  db.properties = db.properties.filter((p) => p.id !== id)
  await writeDb(db)
}

export async function verifyPassword(password: string): Promise<boolean> {
  const db = await readDb()
  return db.password === password
}

export async function changePassword(next: string): Promise<void> {
  const db = await readDb()
  db.password = next
  await writeDb(db)
}

export async function getSessionToken(): Promise<string> {
  const db = await readDb()
  return db.sessionToken
}
