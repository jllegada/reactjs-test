// ─────────────────────────────────────────────────────────────────────────
// ContactsProvider.tsx — owns the contacts state and shares it via context.
//
// React concepts covered here:
//   - useState and useContext working together: useState *holds* the
//     data, context *delivers* it to whoever needs it
//   - the `children` prop — whatever JSX you put between
//     <ContactsProvider> and </ContactsProvider>
//   - rendering a context as a provider (<ContactsContext value={...}>)
//
// TypeScript concepts covered here:
//   - ReactNode — the type for "anything React can render"
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import type { ReactNode } from 'react'
import type { Contact } from '../types'
import { ContactsContext } from './ContactsContext'

type ContactsProviderProps = {
  children: ReactNode
}

function ContactsProvider({ children }: ContactsProviderProps) {
  // Still plain useState. Context does not store anything by itself; it
  // only passes along whatever value we give it. When setContacts runs,
  // this component re-renders, the context value changes, and every
  // component that calls useContacts() re-renders with the new list.
  const [contacts, setContacts] = useState<Contact[]>([])

  function addContact(contact: Contact) {
    setContacts([contact, ...contacts])
  }

  function deleteContact(id: number) {
    setContacts(contacts.filter((contact) => contact.id !== id))
  }

  // In React 19 you render the context itself as the provider. (Older
  // React versions wrote <ContactsContext.Provider value={...}>, which
  // still works.) Every component inside `children`, however deeply
  // nested, can now read this value.
  return (
    <ContactsContext value={{ contacts, addContact, deleteContact }}>
      {children}
    </ContactsContext>
  )
}

export default ContactsProvider
