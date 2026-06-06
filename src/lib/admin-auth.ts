// Lightweight admin gate. Default password is "admin123" — user can change in code.
// Only admins can add / edit / delete records across the app.
import { useCallback, useEffect, useState } from "react";

const KEY = "nexspace.admin";
export const ADMIN_PASSWORD = "admin123";

let _isAdmin =
  typeof window !== "undefined" && localStorage.getItem(KEY) === "1";
const listeners = new Set<() => void>();

function setAdmin(v: boolean) {
  _isAdmin = v;
  if (typeof window !== "undefined") {
    if (v) localStorage.setItem(KEY, "1");
    else localStorage.removeItem(KEY);
  }
  listeners.forEach((fn) => fn());
}

export function useAdmin() {
  const [isAdmin, setIsAdminState] = useState(_isAdmin);

  useEffect(() => {
    const fn = () => setIsAdminState(_isAdmin);
    listeners.add(fn);
    setIsAdminState(_isAdmin);
    return () => {
      listeners.delete(fn);
    };
  }, []);

  const login = useCallback((pwd: string) => {
    if (pwd === ADMIN_PASSWORD) {
      setAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => setAdmin(false), []);

  return { isAdmin, login, logout };
}
