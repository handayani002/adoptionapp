import { useMemo, useState } from 'react'
import './App.css'

const DOGS = [
  {
    id: 1,
    name: 'Milo',
    age: '2 years',
    breed: 'Corgi Mix',
    size: 'Medium',
    personality: 'Playful, smart, and always ready for a walk',
    energy: 'High',
    favorite: 'Sunshine naps and squeaky toys',
    bio: 'Milo is a happy little explorer who loves meeting new people and making friends with every dog he meets.',
    emoji: '🐶',
  },
  {
    id: 2,
    name: 'Luna',
    age: '3 years',
    breed: 'Golden Retriever',
    size: 'Large',
    personality: 'Gentle, affectionate, and patient',
    energy: 'Medium',
    favorite: 'Retrieving tennis balls and cuddling on the couch',
    bio: 'Luna is a sweet and social companion who adores kids, long walks, and being part of the family.',
    emoji: '🐕',
  },
  {
    id: 3,
    name: 'Ollie',
    age: '1 year',
    breed: 'Terrier Mix',
    size: 'Small',
    personality: 'Curious, goofy, and full of personality',
    energy: 'High',
    favorite: 'Adventure time and chasing leaves',
    bio: 'Ollie has a big personality in a little package and is always ready for a fun day out.',
    emoji: '🐾',
  },
  {
    id: 4,
    name: 'Coco',
    age: '4 years',
    breed: 'Shih Tzu',
    size: 'Small',
    personality: 'Calm, loyal, and affectionate',
    energy: 'Low',
    favorite: 'Lounging by the window and gentle pets',
    bio: 'Coco is a quiet sweetheart who loves cozy routines and making a home feel warm and joyful.',
    emoji: '🐩',
  },
  {
    id: 5,
    name: 'Scout',
    age: '5 years',
    breed: 'Shepherd Mix',
    size: 'Large',
    personality: 'Confident, brave, and deeply loyal',
    energy: 'Medium',
    favorite: 'Hikes, training games, and a good chew toy',
    bio: 'Scout thrives with structure and affection, and he is happiest when he has a companion for daily adventures.',
    emoji: '🐕‍🦺',
  },
  {
    id: 6,
    name: 'Peaches',
    age: '2 years',
    breed: 'Beagle Mix',
    size: 'Medium',
    personality: 'Playful, nose-driven, and endlessly curious',
    energy: 'High',
    favorite: 'Sniffing trails and curling up after a busy day',
    bio: 'Peaches is an enthusiastic little explorer with a nose for adventure and a love for attention.',
    emoji: '🐕',
  },
]

const loginCredentials = {
  username: 'admin',
  password: 'password',
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('dogs')
  const [selectedDogId, setSelectedDogId] = useState(DOGS[0].id)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [loginError, setLoginError] = useState('')
  const [applications, setApplications] = useState([])

  const selectedDog = useMemo(
    () => DOGS.find((dog) => dog.id === selectedDogId) ?? DOGS[0],
    [selectedDogId],
  )

  const handleLogin = (event) => {
    event.preventDefault()

    if (
      loginForm.username === loginCredentials.username &&
      loginForm.password === loginCredentials.password
    ) {
      setIsLoggedIn(true)
      setLoginError('')
      setCurrentPage('dogs')
      return
    }

    setLoginError('Invalid username or password. Please try again.')
  }

  const handleApply = (formData) => {
    const newApplication = {
      id: Date.now(),
      dogId: selectedDog.id,
      dogName: selectedDog.name,
      status: 'Pending review',
      appliedAt: new Date().toLocaleDateString(),
      ...formData,
    }

    setApplications((existing) => [newApplication, ...existing])
    setCurrentPage('status')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentPage('dogs')
    setLoginForm({ username: '', password: '' })
    setLoginError('')
  }

  const renderContent = () => {
    if (!isLoggedIn) {
      return (
        <div className="auth-page">
          <div className="auth-card">
            <div className="brand-block">
              <span className="brand-mark">🐾</span>
              <h1>Pawfect Match</h1>
              <p>Find your new best friend.</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
              <h2>Login</h2>

              <label>
                Username
                <input
                  type="text"
                  value={loginForm.username}
                  onChange={(event) =>
                    setLoginForm((current) => ({
                      ...current,
                      username: event.target.value,
                    }))
                  }
                  placeholder="admin"
                />
              </label>

              <label>
                Password
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(event) =>
                    setLoginForm((current) => ({
                      ...current,
                      password: event.target.value,
                    }))
                  }
                  placeholder="password"
                />
              </label>

              {loginError && <p className="error-message">{loginError}</p>}

              <button type="submit" className="primary-button">
                Sign in
              </button>

              <div className="login-hint">
                <strong>Demo credentials:</strong> Username: admin | Password: password
              </div>
            </form>
          </div>
        </div>
      )
    }

    if (currentPage === 'status') {
      return (
        <div className="page-shell">
          <header className="topbar">
            <div className="brand">
              <span>🐾</span>
              <strong>Pawfect Match</strong>
            </div>

            <nav className="nav">
              <button type="button" onClick={() => setCurrentPage('dogs')}>
                Dogs
              </button>
              <button type="button" className="nav-active" onClick={() => setCurrentPage('status')}>
                Application Status
              </button>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          </header>

          <main className="status-page">
            <div className="section-heading">
              <p className="eyebrow">Your adoption journey</p>
              <h2>Application status</h2>
            </div>

            {applications.length === 0 ? (
              <div className="empty-state">
                <h3>No applications yet</h3>
                <p>Once you apply to a dog, you can track your status here.</p>
                <button type="button" className="primary-button" onClick={() => setCurrentPage('dogs')}>
                  Browse dogs
                </button>
              </div>
            ) : (
              <div className="status-list">
                {applications.map((application) => (
                  <article key={application.id} className="status-card">
                    <div className="status-card-header">
                      <div>
                        <p className="eyebrow">Dog</p>
                        <h3>{application.dogName}</h3>
                      </div>
                      <span className="status-badge">{application.status}</span>
                    </div>

                    <div className="status-details">
                      <p>
                        <strong>Submitted:</strong> {application.appliedAt}
                      </p>
                      <p>
                        <strong>Applicant:</strong> {application.name}
                      </p>
                      <p>
                        <strong>Email:</strong> {application.email}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </div>
      )
    }

    if (currentPage === 'profile') {
      const dog = selectedDog

      return (
        <div className="page-shell">
          <header className="topbar">
            <div className="brand">
              <span>🐾</span>
              <strong>Pawfect Match</strong>
            </div>

            <nav className="nav">
              <button type="button" onClick={() => setCurrentPage('dogs')}>
                Dogs
              </button>
              <button type="button" onClick={() => setCurrentPage('status')}>
                Application Status
              </button>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </nav>
          </header>

          <main className="profile-page">
            <button type="button" className="back-link" onClick={() => setCurrentPage('dogs')}>
              ← Back to dogs
            </button>

            <section className="profile-card">
              <div className="profile-hero">
                <div className="dog-avatar large">{dog.emoji}</div>
                <div>
                  <p className="eyebrow">Meet {dog.name}</p>
                  <h2>{dog.name}</h2>
                  <p>
                    {dog.breed} • {dog.age} • {dog.size}
                  </p>
                </div>
              </div>

              <div className="profile-grid">
                <div className="profile-copy">
                  <h3>About</h3>
                  <p>{dog.bio}</p>

                  <ul className="dog-facts">
                    <li>
                      <strong>Personality:</strong> {dog.personality}
                    </li>
                    <li>
                      <strong>Energy:</strong> {dog.energy}
                    </li>
                    <li>
                      <strong>Favorite thing:</strong> {dog.favorite}
                    </li>
                  </ul>
                </div>

                <form
                  className="application-form"
                  onSubmit={(event) => {
                    event.preventDefault()

                    const formData = new FormData(event.currentTarget)
                    handleApply({
                      name: formData.get('name'),
                      email: formData.get('email'),
                      phone: formData.get('phone'),
                      homeType: formData.get('homeType'),
                      message: formData.get('message'),
                    })
                  }}
                >
                  <h3>Apply to adopt {dog.name}</h3>

                  <label>
                    Full name
                    <input type="text" name="name" required />
                  </label>

                  <label>
                    Email
                    <input type="email" name="email" required />
                  </label>

                  <label>
                    Phone number
                    <input type="tel" name="phone" required />
                  </label>

                  <label>
                    Home situation
                    <select name="homeType" defaultValue="Apartment">
                      <option>Apartment</option>
                      <option>House with yard</option>
                      <option>House without yard</option>
                      <option>Farm or rural home</option>
                    </select>
                  </label>

                  <label>
                    Why would you be a great fit?
                    <textarea name="message" rows="4" placeholder="Tell us about your home and lifestyle." required />
                  </label>

                  <button type="submit" className="primary-button">
                    Submit application
                  </button>
                </form>
              </div>
            </section>
          </main>
        </div>
      )
    }

    return (
      <div className="page-shell">
        <header className="topbar">
          <div className="brand">
            <span>🐾</span>
            <strong>Pawfect Match</strong>
          </div>

          <nav className="nav">
            <button type="button" className="nav-active" onClick={() => setCurrentPage('dogs')}>
              Dogs
            </button>
            <button type="button" onClick={() => setCurrentPage('status')}>
              Application Status
            </button>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </nav>
        </header>

        <main className="listing-page">
          <div className="section-heading">
            <p className="eyebrow">Available now</p>
            <h2>Meet the dogs</h2>
          </div>

          <div className="dog-grid">
            {DOGS.map((dog) => (
              <button
                key={dog.id}
                type="button"
                className="dog-card"
                onClick={() => {
                  setSelectedDogId(dog.id)
                  setCurrentPage('profile')
                }}
              >
                <div className="dog-avatar">{dog.emoji}</div>
                <div className="dog-card-copy">
                  <h3>{dog.name}</h3>
                  <p>
                    {dog.breed} • {dog.age}
                  </p>
                </div>
                <span className="card-tag">{dog.energy} energy</span>
              </button>
            ))}
          </div>
        </main>
      </div>
    )
  }

  return <>{renderContent()}</>
}

export default App
