require('dotenv').config();
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const cors = require('cors');
const knex = require('knex');

// Initialize app and database
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));

const db = knex({
  client: 'sqlite3',
  connection: { filename: './data.sqlite' },
  useNullAsDefault: true,
});

// Set up session store
const sessionStore = new KnexSessionStore({
  knex: db,
  tablename: 'sessions',
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Passport configuration
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      let user = users.find((u) => u.googleId === profile.id);
      if (!user) {
        user = { id: users.length + 1, googleId: profile.id, name: profile.displayName, email: profile.emails[0].value };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

// Mock database
const users = [];

// Routes
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, passwordHash };
  users.push(user);
  res.json({ message: 'User registered successfully' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (user && (await bcrypt.compare(password, user.passwordHash))) {
    req.session.userId = user.id;
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    req.session.userId = req.user.id;
    res.redirect(process.env.CLIENT_URL);
  }
);

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Logged out successfully' });
    });
  });
});

app.get('/current_user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
