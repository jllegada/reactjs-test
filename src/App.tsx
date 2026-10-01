// ─────────────────────────────────────────────────────────────────────────
// App.tsx — the top-level ("parent") component.
//
// This file is written as a mini tutorial, split across a few files so
// each piece is easier to read on its own:
//   - types.ts                   — the shared `Contact` type
//   - context/ContactsContext    — the context object + useContacts hook
//   - context/ContactsProvider   — owns the state, shares it via context
//   - components/ContactForm     — the input form (controlled inputs, events)
//   - components/ContactList     — displays the saved contacts (lists, keys)
//   - App.tsx (this file)        — lays out the page, wraps it in the provider
//
// React concepts covered here:
//   - components as functions returning JSX
//   - wrapping part of the tree in a context Provider
//
// Before context, App owned the state with useState and passed
// `contacts`, `addContact` and `deleteContact` down as props. That was
// "lifting state up". The state now lives in ContactsProvider, and the
// form and list read it themselves with useContacts(), so App doesn't
// pass any props.
// ─────────────────────────────────────────────────────────────────────────

import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactsProvider from "./context/ContactsProvider";
import "./App.css";

function App() {
  return (
    // Anything inside <ContactsProvider> can call useContacts().
    // A component rendered outside it would hit the error thrown in
    // useContacts, because there'd be no value to read.
    <ContactsProvider>
      <main className="page-shell">
        <header className="intro">
          <p className="eyebrow">React fundamentals / 02</p>
          <h1>Leave a note.</h1>
          <p className="subtitle">
            A tiny contact form built with useState, useContext, and events.
          </p>
        </header>

        <div className="workspace">
          {/* No props: each component gets what it needs from context. */}
          <ContactForm />
          <ContactList />
        </div>
      </main>
    </ContactsProvider>
  );
}

export default App;
