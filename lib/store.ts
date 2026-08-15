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
    id: "boulevard-point-burj-khalifa-fireworks-view",
    name: "Boulevard Point I Burj Khalifa Fireworks View",
    location: "Downtown Dubai",
    image: "https://assets.guesty.com/image/upload/h_800/listing_images_s3/production/property-photos/37f38dd2056bd6c49d4470880ae034856085c2d8009f8b90/6904b38f1790ec0012b73b01/5eabf699-cfe7-4a-_-sZL",
    beds: "2",
    baths: "2.5",
    sqft: "1,450",
    tag: "Burj Khalifa Fireworks View",
    enquireLink: "",
  },
  {
    id: "gemz-al-furjan-private-pool",
    name: "Gemz - Al Furjan I Private Pool",
    location: "Al Furjan, Dubai",
    image: "https://assets.guesty.com/image/upload/h_800/listing_images_s3/production/property-photos/37f38dd2056bd6c49d4470880ae034856085c2d8009f8b90/68f0c8314ec9060010ac9ed0/4fb6a7da-1ec7-47-fOuqC",
    beds: "3",
    baths: "2.5",
    sqft: "1,900",
    tag: "Private Pool",
    enquireLink: "",
  },
  {
    id: "aykon-city-tower-business-bay",
    name: "Aykon City Tower I Business Bay I Skyline Views",
    location: "Business Bay, Dubai",
    image: "https://assets.guesty.com/image/upload/h_800/v1771846953/production/601bdb6ee22e67002eb8a8cd/ymrdo6rvd4szuxfgzinl.jpg",
    beds: "1",
    baths: "1",
    sqft: "750",
    tag: "Skyline Views",
    enquireLink: "",
  },
  {
    id: "farhad-azizi-residence-al-jaddaf",
    name: "Farhad Azizi Residence",
    location: "Al Jaddaf, Dubai",
    image: "https://assets.guesty.com/image/upload/h_800/listing_images_s3/production/property-photos/37f38dd2056bd6c49d4470880ae034856085c2d8009f8b90/685bcee4c495ea0047183907/f312ad97-ecfb-4d-rRchF",
    beds: "1",
    baths: "1",
    sqft: "700",
    tag: "Modern City Living",
    enquireLink: "",
  },
  {
    id: "creek-side-18-dubai-creek",
    name: "Creek Side 18 I Dubai Creek I Harbor Views",
    location: "Dubai Creek Harbour",
    image: "https://assets.guesty.com/image/upload/h_800/v1745932482/production/601bdb6ee22e67002eb8a8cd/i3kppoid7glqxrw05jt2.jpg",
    beds: "2",
    baths: "2",
    sqft: "1,250",
    tag: "Harbor Views",
    enquireLink: "",
  },
  {
    id: "opera-grand-burj-fireworks-view",
    name: "Opera Grand I Burj Fireworks View",
    location: "Downtown Dubai",
    image: "https://assets.guesty.com/image/upload/h_800/listing_images_s3/production/property-photos/37f38dd2056bd6c49d4470880ae034856085c2d8009f8b90/66f3dfca6537830012d3ff98-1253402681962527791_2000034767",
    beds: "2",
    baths: "2",
    sqft: "1,300",
    tag: "Opera District Views",
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
