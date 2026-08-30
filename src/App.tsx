import {
  createContext,
  type Dispatch,
  type FormEvent,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react'
import './App.css'

type Contact = { id: number; name: string; email: string; message: string }
type FormState = { contacts: Contact[] }
type FormAction = { type: 'add'; contact: Contact } | { type: 'remove'; id: number }
const storageKey = 'react-contact-form'

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'add': return { contacts: [action.contact, ...state.contacts] }
    case 'remove': return { contacts: state.contacts.filter((contact) => contact.id !== action.id) }
  }
}

const FormContext = createContext<{ state: FormState; dispatch: Dispatch<FormAction> } | null>(null)

function useForm() {
  const context = useContext(FormContext)
  if (!context) throw new Error('useForm must be used inside FormContext')
  return context
}

function App() {
  const [state, dispatch] = useReducer(formReducer, { contacts: [] }, () => {
    const saved = localStorage.getItem(storageKey)
    return saved ? { contacts: JSON.parse(saved) as Contact[] } : { contacts: [] }
  })

  useEffect(() => { localStorage.setItem(storageKey, JSON.stringify(state.contacts)) }, [state.contacts])

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      <main className="page-shell">
        <header className="intro"><p className="eyebrow">React fundamentals / 01</p><h1>Leave a note.</h1><p className="subtitle">A tiny contact book powered by context, a reducer, and your browser.</p></header>
        <div className="workspace"><ContactForm /><ContactList /></div>
      </main>
    </FormContext.Provider>
  )
}

function ContactForm() {
  const { dispatch } = useForm()
  const [fields, setFields] = useState({ name: '', email: '', message: '' })
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    dispatch({ type: 'add', contact: { id: Date.now(), ...fields } })
    setFields({ name: '', email: '', message: '' })
  }
  return <section className="form-panel"><div className="section-heading"><span className="number">01</span><div><h2>New message</h2><p>Fill out the fields and keep it close.</p></div></div><form onSubmit={handleSubmit}>
    <label>Your name<input required value={fields.name} onChange={(event) => setFields({ ...fields, name: event.target.value })} /></label>
    <label>Email address<input required type="email" value={fields.email} onChange={(event) => setFields({ ...fields, email: event.target.value })} /></label>
    <label>Message<textarea required rows={5} value={fields.message} onChange={(event) => setFields({ ...fields, message: event.target.value })} /></label>
    <button type="submit">Save message <span aria-hidden="true">↗</span></button>
  </form></section>
}

function ContactList() {
  const { state, dispatch } = useForm()
  return <section className="list-panel"><div className="section-heading"><span className="number">02</span><div><h2>Saved locally</h2><p>{state.contacts.length} {state.contacts.length === 1 ? 'message' : 'messages'} in this browser.</p></div></div><div className="contact-list">
    {state.contacts.length === 0 ? <p className="empty-state">Your saved messages will appear here.</p> : state.contacts.map((contact) => <article className="contact" key={contact.id}><div className="contact-topline"><div><h3>{contact.name}</h3><a href={`mailto:${contact.email}`}>{contact.email}</a></div><button className="delete-button" type="button" aria-label={`Delete message from ${contact.name}`} onClick={() => dispatch({ type: 'remove', id: contact.id })}>×</button></div><p>{contact.message}</p></article>)}
  </div></section>
}

export default App
