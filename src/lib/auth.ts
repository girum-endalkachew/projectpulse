export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function getCurrentUser(): UserSession | null {
  if (typeof window === "undefined") return null;
  const session = localStorage.getItem("pulse_session");
  if (!session) return null;
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
}

export function loginUser(email: string): UserSession {
  const user: UserSession = {
    id: "usr_admin_1",
    name: "Girum Endalkachew",
    email: email || "admin@projectpulse.dev",
    role: "Lead Engineer",
  };
  if (typeof window !== "undefined") {
    localStorage.setItem("pulse_session", JSON.stringify(user));
  }
  return user;
}

export function logoutUser(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("pulse_session");
  }
}