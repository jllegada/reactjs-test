// ─────────────────────────────────────────────────────────────────────────
// ContactList.tsx — displays the saved contacts.
//
// React concepts covered here:
//   - rendering an array with .map() and a unique `key`
//   - conditional rendering (showing an "empty state" vs the real list)
//   - reading shared state and functions from context (useContacts)
// ─────────────────────────────────────────────────────────────────────────

import { useContacts } from '../context/ContactsContext'

function ContactList() {
  // Same context as ContactForm reads. When the form calls addContact,
  // the provider's state changes and this component re-renders with the
  // new `contacts`, even though the form and the list never talk to each
  // other directly.
  const { contacts, deleteContact } = useContacts()

  return (
    <section className="list-panel">
      <div className="section-heading">
        <span className="number">02</span>
        <div>
          <h2>Saved messages</h2>
          <p>
            {contacts.length} {contacts.length === 1 ? 'message' : 'messages'} so far.
          </p>
        </div>
      </div>

      <div className="contact-list">
        {/*
          Conditional rendering: the ternary (condition ? a : b) picks
          which JSX to show depending on whether the list is empty.
        */}
        {contacts.length === 0 ? (
          <p className="empty-state">Your saved messages will appear here.</p>
        ) : (
          // Rendering a list: .map() turns each item in the array into a
          // piece of JSX. React needs a unique `key` on each item so it
          // can track which is which when the list changes — we use the
          // contact's id, since it's unique per contact.
          contacts.map((contact) => (
            <article className="contact" key={contact.id}>
              <div className="contact-topline">
                <div>
                  <h3>{contact.name}</h3>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </div>
                <button
                  className="delete-button"
                  type="button"
                  aria-label={`Delete message from ${contact.name}`}
                  onClick={() => deleteContact(contact.id)}
                >
                  ×
                </button>
              </div>
              <p>{contact.message}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

export default ContactList
