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
  return {
    name: String(formData.get("name") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    image: String(formData.get("image") ?? "").trim(),
    beds: String(formData.get("beds") ?? "").trim(),
    baths: String(formData.get("baths") ?? "").trim(),
    sqft: String(formData.get("sqft") ?? "").trim(),
    tag: String(formData.get("tag") ?? "").trim(),
    enquireLink: String(formData.get("enquireLink") ?? "").trim(),
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
