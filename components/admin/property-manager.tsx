"use client"

import { useActionState, useEffect, useState } from "react"
import { Plus, Pencil, Trash2, ExternalLink, X, AlertTriangle } from "lucide-react"
import type { Property } from "@/lib/store"
import {
  savePropertyAction,
  deletePropertyAction,
  type ActionState,
} from "@/app/admin/actions"

const EMPTY: Property = {
  id: "",
  name: "",
  location: "",
  image: "",
  beds: "",
  baths: "",
  sqft: "",
  tag: "",
  enquireLink: "",
}

export function PropertyManager({ properties }: { properties: Property[] }) {
  const [editing, setEditing] = useState<Property | null>(null)

  return (
    <section>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-medium text-foreground">
            Residences
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {properties.length} {properties.length === 1 ? "property" : "properties"} published
          </p>
        </div>
        <button
          type="button"
          onClick={() => setEditing(EMPTY)}
          className="inline-flex items-center gap-2 rounded-sm bg-gold px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90"
        >
          <Plus className="size-4" />
          Add Property
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border/60">
        {properties.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-muted-foreground">
            No properties yet. Add your first residence.
          </p>
        ) : (
          <ul className="divide-y divide-border/60">
            {properties.map((p) => (
              <li key={p.id} className="flex items-center gap-4 p-4">
                <img
                  src={p.image || "/placeholder.svg"}
                  alt={p.name}
                  className="size-16 shrink-0 rounded-sm object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-lg text-foreground">{p.name}</p>
                  <p className="truncate text-xs text-muted-foreground">{p.location}</p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                    {p.enquireLink ? (
                      <>
                        <ExternalLink className="size-3 text-gold" />
                        <span className="truncate">{p.enquireLink}</span>
                      </>
                    ) : (
                      <span className="text-destructive/80">No enquire link set</span>
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditing(p)}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs text-foreground transition-colors hover:border-gold hover:text-gold"
                  >
                    <Pencil className="size-3.5" />
                    Edit
                  </button>
                  <DeleteButton id={p.id} name={p.name} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editing ? (
        <PropertyDialog property={editing} onClose={() => setEditing(null)} />
      ) : null}
    </section>
  )
}

function DeleteButton({ id, name }: { id: string; name: string }) {
  const [confirming, setConfirming] = useState(false)

  if (confirming) {
    return (
      <form action={deletePropertyAction} className="flex items-center gap-1.5">
        <input type="hidden" name="id" value={id} />
        <button
          type="submit"
          className="inline-flex items-center gap-1.5 rounded-sm bg-destructive px-3 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
        >
          <Trash2 className="size-3.5" />
          Delete {name}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="rounded-sm border border-border px-2 py-2 text-xs text-muted-foreground hover:text-foreground"
        >
          Cancel
        </button>
      </form>
    )
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      aria-label={`Delete ${name}`}
      className="inline-flex items-center rounded-sm border border-border p-2 text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
    >
      <Trash2 className="size-3.5" />
    </button>
  )
}

function PropertyDialog({
  property,
  onClose,
}: {
  property: Property
  onClose: () => void
}) {
  const [state, formAction, pending] = useActionState<ActionState, FormData>(
    savePropertyAction,
    null,
  )
  const isNew = !property.id

  // Close the dialog once a save succeeds.
  useEffect(() => {
    if (state?.success) {
      onClose()
    }
  }, [state, onClose])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-border bg-card p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-foreground">
            {isNew ? "Add Property" : "Edit Property"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </div>

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="id" value={property.id} />

          <Field label="Property Name" name="name" defaultValue={property.name} required />
          <Field label="Location" name="location" defaultValue={property.location} required />
          <Field
            label="Image URL"
            name="image"
            defaultValue={property.image}
            placeholder="https://… or /images/property.png"
          />
          <div className="grid grid-cols-3 gap-3">
            <Field label="Beds" name="beds" defaultValue={property.beds} />
            <Field label="Baths" name="baths" defaultValue={property.baths} />
            <Field label="Sq. Ft." name="sqft" defaultValue={property.sqft} />
          </div>
          <Field
            label="Tag / Highlight"
            name="tag"
            defaultValue={property.tag}
            placeholder="Burj Khalifa Views"
          />
          <Field
            label="Enquire Link (Guesty URL)"
            name="enquireLink"
            defaultValue={property.enquireLink}
            placeholder="https://luxbnb.guestybookings.com/…"
          />

          {state?.error ? (
            <p className="flex items-center gap-2 text-sm text-destructive">
              <AlertTriangle className="size-4" />
              {state.error}
            </p>
          ) : null}

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-sm border border-border px-4 py-2.5 text-xs uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={pending}
              className="rounded-sm bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
            >
              {pending ? "Saving…" : isNew ? "Add Property" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({
  label,
  name,
  defaultValue,
  placeholder,
  required,
}: {
  label: string
  name: string
  defaultValue?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] uppercase tracking-[0.15em] text-muted-foreground"
      >
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      <input
        id={name}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-gold"
      />
    </div>
  )
}
