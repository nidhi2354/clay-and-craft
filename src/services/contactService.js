const STORAGE_KEY = "zivonix_inquiries";

const read = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const write = (inquiries) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch {
    // localStorage unavailable — the submit still resolves, it just
    // won't be found again after a refresh.
  }
};

/**
 * Contact-form persistence — same Promise-based shape as the other
 * services (see cartService's header comment). Today it just stamps
 * and stores the message locally; swap the body for a
 * `POST /inquiries` call later and the About page's form doesn't
 * have to change.
 */
export const submitInquiry = async ({ name, email, phone, message }) => {
  const inquiry = {
    id: Date.now(),
    name,
    email,
    phone,
    message,
    submittedAt: new Date().toISOString(),
  };

  write([inquiry, ...read()]);
  return inquiry;
};
