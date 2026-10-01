// ─────────────────────────────────────────────────────────────────────────
// ContactsContext.ts — creates the context object and a hook to read it.
//
// React concepts covered here:
//   - createContext — makes a "channel" that any component below a
//     Provider can read from, without passing props through every level
//   - useContext — the hook a component calls to read that channel
//   - a custom hook (useContacts) that wraps useContext
//
// TypeScript concepts covered here:
//   - describing the context's value with a `type`
//   - `| null` in a generic — the context starts empty until a Provider
//     supplies a real value
//
// The component that actually *provides* the value lives in
// ContactsProvider.tsx. (It's in a separate file because Vite's fast
// refresh works best when a .tsx file only exports components.)
// ─────────────────────────────────────────────────────────────────────────

import { createContext, useContext } from 'react'
import type { Contact } from '../types'

// Everything a component can get from this context: the data itself plus
// the functions that change it.
export type ContactsContextValue = {
  contacts: Contact[]
  addContact: (contact: Contact) => void
  deleteContact: (id: number) => void
}

// createContext needs a default value, used when a component reads the
// context but there's no Provider above it in the tree. We use `null` so
// we can detect that mistake in useContacts below.
export const ContactsContext = createContext<ContactsContextValue | null>(null)

// A custom hook is just a function whose name starts with `use` and that
// calls other hooks. Wrapping useContext this way means components write
// `useContacts()` instead of `useContext(ContactsContext)`, and they
// always get a non-null value, so TypeScript doesn't make every caller
// check for null.
export function useContacts(): ContactsContextValue {
  const value = useContext(ContactsContext)
  if (value === null) {
    throw new Error('useContacts must be used inside <ContactsProvider>')
  }
  return value
}
