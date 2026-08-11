"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import {
  createProperty,
  updateProperty,
  deleteProperty,
  saveSlideshow,
  verifyPassword,
  changePassword,
  type PropertyInput,
} from "@/lib/store"
import { isAuthenticated, createSession, destroySession } from "@/lib/auth"

export type ActionState = { error?: string; success?: string } | null

export async function loginAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const password = String(formData.get("password") ?? "")
  const ok = await verifyPassword(password)
  if (!ok) {
    return { error: "Incorrect password. Please try again." }
  }
  await createSession()
  redirect("/admin")
}

export async function logoutAction(): Promise<void> {
  await destroySession()
  redirect("/admin/login")
}

function parseProperty(formData: FormData): PropertyInput {
  const clean = (key: string, max = 240) => String(formData.get(key) ?? "").trim().slice(0, max)
  return {
    name: clean("name", 120),
    location: clean("location", 160),
    image: clean("image", 500),
    beds: clean("beds", 40),
    baths: clean("baths", 40),
    sqft: clean("sqft", 40),
    tag: clean("tag", 160),
    enquireLink: clean("enquireLink", 500),
  }
}

export async function savePropertyAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Session expired. Please sign in again." }
  }
  const id = String(formData.get("id") ?? "").trim()
  const data = parseProperty(formData)
  if (!data.name || !data.location) {
    return { error: "Name and location are required." }
  }
  if (data.enquireLink) {
    try {
      const url = new URL(data.enquireLink)
      if (url.protocol !== "https:") return { error: "Enquiry link must use HTTPS." }
    } catch {
      return { error: "Enquiry link must be a valid URL." }
    }
  }
  if (id) {
    await updateProperty(id, data)
  } else {
    await createProperty(data)
  }
  revalidatePath("/admin")
  revalidatePath("/")
  return { success: id ? "Property updated." : "Property added." }
}

export async function deletePropertyAction(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return
  const id = String(formData.get("id") ?? "").trim()
  if (id) {
    await deleteProperty(id)
    revalidatePath("/admin")
    revalidatePath("/")
  }
}

export async function saveSlideshowAction(formData: FormData): Promise<void> {
  if (!(await isAuthenticated())) return
  const ids = formData.getAll("propertyId").map(String).filter(Boolean)
  await saveSlideshow(ids)
  revalidatePath("/admin")
  revalidatePath("/")
}

export async function changePasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  if (!(await isAuthenticated())) {
    return { error: "Session expired. Please sign in again." }
  }
  const current = String(formData.get("current") ?? "")
  const next = String(formData.get("next") ?? "")
  const confirm = String(formData.get("confirm") ?? "")
  if (!(await verifyPassword(current))) {
    return { error: "Current password is incorrect." }
  }
  if (next.length < 4) {
    return { error: "New password must be at least 4 characters." }
  }
  if (next !== confirm) {
    return { error: "New passwords do not match." }
  }
  await changePassword(next)
  return { success: "Password updated." }
}
