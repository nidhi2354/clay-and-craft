const USERS_KEY = "zivonix_users";
const SESSION_KEY = "zivonix_session";

const readUsers = () => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeUsers = (users) => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // localStorage unavailable — signup still resolves, it just won't persist.
  }
};

const readSession = () => {
  try {
    return localStorage.getItem(SESSION_KEY);
  } catch {
    return null;
  }
};

const writeSession = (email) => {
  try {
    if (email) localStorage.setItem(SESSION_KEY, email);
    else localStorage.removeItem(SESSION_KEY);
  } catch {
    // localStorage unavailable — session just won't persist across reloads.
  }
};

/** Never hand the stored password back to a component. */
const toPublicUser = (user) => (user ? { name: user.name, email: user.email } : null);

/**
 * Mock auth persistence — same Promise-based, localStorage-backed shape
 * as cartService/wishlistService. Passwords are stored in the clear
 * because this is a client-only demo with no backend; a real API would
 * replace every function body here with a fetch call and nothing above
 * this file (AuthContext, the Account page) would need to change.
 */
export const getCurrentUser = async () => {
  const email = readSession();
  if (!email) return null;
  return toPublicUser(readUsers().find((u) => u.email === email));
};

export const signup = async ({ name, email, password }) => {
  const users = readUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    throw new Error("An account with this email already exists");
  }

  const user = { name, email, password };
  writeUsers([...users, user]);
  writeSession(email);
  return toPublicUser(user);
};

export const login = async ({ email, password }) => {
  const user = readUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  );
  if (!user) throw new Error("Invalid email or password");

  writeSession(user.email);
  return toPublicUser(user);
};

export const logout = async () => {
  writeSession(null);
};
