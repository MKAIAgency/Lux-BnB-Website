"use server"

import { Resend } from "resend"

export type EnquiryState = {
  status: "idle" | "success" | "error"
  message: string
  errors?: {
    name?: string
    email?: string
    dates?: string
    message?: string
  }
}

// Where enquiry emails are delivered.
const TO_EMAIL = "mikke259@gmail.com"
// Resend's shared onboarding sender works without domain verification.
// Swap this for a verified domain address (e.g. bookings@luxtravels.com) later.
const FROM_EMAIL = "LUX BNB Enquiries <onboarding@resend.dev>"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function sendEnquiry(
  _prev: EnquiryState,
  formData: FormData,
): Promise<EnquiryState> {
  const name = String(formData.get("name") ?? "").trim()
  const email = String(formData.get("email") ?? "").trim()
  const dates = String(formData.get("dates") ?? "").trim()
  const message = String(formData.get("message") ?? "").trim()

  // Validate input server-side.
  const errors: EnquiryState["errors"] = {}
  if (!name) errors.name = "Please enter your name."
  if (!email) {
    errors.email = "Please enter your email."
  } else if (!EMAIL_RE.test(email)) {
    errors.email = "Please enter a valid email address."
  }
  if (!message) errors.message = "Please tell us about your stay."

  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please fix the highlighted fields.", errors }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return {
      status: "error",
      message:
        "Email service is not configured yet. Please add a RESEND_API_KEY and try again.",
    }
  }

  const resend = new Resend(apiKey)

  const safe = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: email,
      subject: `New enquiry from ${name}`,
      text: `New enquiry from the LUX BNB website\n\nName: ${name}\nEmail: ${email}\nDates: ${dates || "Not specified"}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.6;">
          <h2 style="color: #b8892b; margin-bottom: 16px;">New Enquiry &mdash; LUX BNB Vacation Homes</h2>
          <p><strong>Name:</strong> ${safe(name)}</p>
          <p><strong>Email:</strong> <a href="mailto:${safe(email)}">${safe(email)}</a></p>
          <p><strong>Dates:</strong> ${dates ? safe(dates) : "Not specified"}</p>
          <p style="margin-top: 16px;"><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; padding: 12px 16px; background: #f6f5f2; border-radius: 6px;">${safe(message)}</p>
        </div>
      `,
    })

    if (error) {
      console.log("[v0] Resend error:", error)
      return {
        status: "error",
        message: "Something went wrong sending your enquiry. Please try again.",
      }
    }

    return {
      status: "success",
      message: "Thank you. Your enquiry has been sent — we'll be in touch shortly.",
    }
  } catch (err) {
    console.log("[v0] sendEnquiry exception:", err)
    return {
      status: "error",
      message: "Something went wrong sending your enquiry. Please try again.",
    }
  }
}
