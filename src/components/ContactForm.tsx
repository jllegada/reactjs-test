// ─────────────────────────────────────────────────────────────────────────
// ContactForm.tsx — the "New message" form.
//
// React concepts covered here:
//   - controlled inputs (value + onChange driven by state)
//   - event handlers (onSubmit)
//   - reading shared state with a context hook (useContacts)
//   - useState for local state vs context for shared state
//
// TypeScript concepts covered here:
//   - typing an event object (FormEvent<HTMLFormElement>)
//   - generics — the <...> in useState<string>
// ─────────────────────────────────────────────────────────────────────────

import { useState } from 'react'
import type { FormEvent } from 'react'
import { useContacts } from '../context/ContactsContext'

function ContactForm() {
  // addContact comes from context, not from a prop. Its type comes from
  // ContactsContextValue, so TypeScript still checks what we pass it.
  const { addContact } = useContacts()

  // These three stay as plain useState. Only this form needs to know what
  // is typed in the boxes, so there's no reason to share them through
  // context. Rule of thumb: keep state local, and share it only when
  // other components need it.
  // useState<string> is a "generic" — the <string> tells TypeScript
  // exactly what type of value this piece of state holds. Because we
  // pass an initial value of '', TypeScript could infer `string` on its
  // own; writing it explicitly is just a good habit while you're
  // learning how generics work.
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [message, setMessage] = useState<string>('')

  // FormEvent<HTMLFormElement> types the "event" object a <form onSubmit>
  // hands us. Telling TypeScript it came from an HTML <form> element
  // means your editor can correctly autocomplete things on `event`.
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // Forms reload the page by default when submitted — we don't want
    // that in a single-page React app, so we stop it here.
    event.preventDefault()

    // Build the new contact from our current state values and add it to
    // the shared list. Because addContact is typed to take a Contact,
    // TypeScript will error here if this object is missing a field.
    addContact({ id: Date.now(), name, email, message })

    // Clear the fields, ready for the next entry.
    setName('')
    setEmail('')
    setMessage('')
  }

  return (
    <section className="form-panel">
      <div className="section-heading">
        <span className="number">01</span>
        <div>
          <h2>New message</h2>
          <p>Fill out the fields and hit save.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Your name
          {/*
            value={name} makes this a "controlled" input — React state is
            the single source of truth for what's in the box.
            onChange fires on every keystroke; event.target.value is
            whatever the user just typed, which we save into state.
          */}
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>

        <label>
          Email address
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>

        <label>
          Message
          <textarea
            required
            rows={5}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>

        <button type="submit">
          Save message <span aria-hidden="true">↗</span>
        </button>
      </form>
    </section>
  )
}

export default ContactForm
