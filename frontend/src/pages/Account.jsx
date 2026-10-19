import { useState } from 'react'
import { login, signup } from '../api/client'
import { dateLine } from '../format'
import { useSession } from '../session'

export default function Account() {
  const { user, signIn, signOut } = useSession()
  const [mode, setMode] = useState('signin')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [note, setNote] = useState('')
  const [pending, setPending] = useState(false)

  if (user) {
    return (
      <section className="account">
        <p className="kicker">On the book</p>
        <h2>{user.name}</h2>
        <p className="account-email">{user.email}</p>
        {user.created_at ? <p className="cap">Opened {dateLine(user.created_at)}</p> : null}
        <p className="note">
          {user.local
            ? 'This name is on the book at this counter only.'
            : 'This name is on the book.'}
        </p>
        <button type="button" className="text-btn" onClick={signOut}>
          Leave the counter
        </button>
      </section>
    )
  }

  function switchMode(next) {
    setMode(next)
    setNote('')
    setPassword('')
  }

  async function onSignIn(formEvent) {
    formEvent.preventDefault()
    setPending(true)
    setNote('')
    try {
      const found = await login({ email: email.trim(), password })
      signIn(found)
    } catch (error) {
      setNote(error.message || 'The counter did not answer.')
    } finally {
      setPending(false)
    }
  }

  async function onSignUp(formEvent) {
    formEvent.preventDefault()
    setPending(true)
    setNote('')
    const body = { name: name.trim(), email: email.trim(), password }
    try {
      const created = await signup(body)
      signIn(created)
    } catch (error) {
      if (error.status === 409 || error.status === 422) {
        setNote(error.message)
        return
      }
      signIn({
        id: `counter-${Date.now()}`,
        name: body.name,
        email: body.email,
        created_at: new Date().toISOString(),
        local: true,
      })
    } finally {
      setPending(false)
    }
  }

  if (mode === 'signin') {
    return (
      <section className="account">
        <h2>Sign in</h2>
        <form className="book" onSubmit={onSignIn}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              autoComplete="email"
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              autoComplete="current-password"
            />
          </label>
          {note ? <p className="form-note">{note}</p> : null}
          <button type="submit" className="ink-btn" disabled={pending}>
            {pending ? 'Waiting' : 'Sign in'}
          </button>
        </form>
        <button type="button" className="text-btn switch" onClick={() => switchMode('signup')}>
          Open a name
        </button>
      </section>
    )
  }

  return (
    <section className="account">
      <h2>Open a name</h2>
      <form className="book" onSubmit={onSignUp}>
        <label>
          Name
          <input value={name} onChange={(event) => setName(event.target.value)} required autoComplete="name" />
        </label>
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="new-password"
          />
        </label>
        {note ? <p className="form-note">{note}</p> : null}
        <button type="submit" className="ink-btn" disabled={pending}>
          {pending ? 'Waiting' : 'Sign up'}
        </button>
      </form>
      <button type="button" className="text-btn switch" onClick={() => switchMode('signin')}>
        Sign in
      </button>
    </section>
  )
}
