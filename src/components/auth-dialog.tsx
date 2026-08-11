"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { ProgressState } from "@/lib/types";

export type AuthMode = "signin" | "signup";

export interface AuthDialogState {
  open: boolean;
  mode: AuthMode;
  /** Prefilled email — e.g. the account a backup was exported from. */
  email: string;
  /**
   * A validated backup waiting for successful auth before it is merged.
   * Set by the profile page when an import requires a password; applied and
   * cleared by the navbar once sign-in/sign-up succeeds, or cleared if the
   * dialog closes without authenticating.
   */
  pendingImport: ProgressState | null;
}

interface AuthDialogContextValue {
  state: AuthDialogState;
  setOpen: (open: boolean) => void;
  setMode: (mode: AuthMode) => void;
  setEmail: (email: string) => void;
  setPendingImport: (state: ProgressState | null) => void;
  /** Open the auth dialog, optionally prefilled. */
  openWith: (opts: { mode?: AuthMode; email?: string }) => void;
}

const AuthDialogContext = createContext<AuthDialogContextValue | null>(null);

/**
 * Owns the sign-in/sign-up dialog state so any page (not just the navbar) can
 * open it — used by the profile page to attach imported progress to an account.
 */
export function AuthDialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthDialogState>({
    open: false,
    mode: "signin",
    email: "",
    pendingImport: null,
  });

  const setOpen = useCallback((open: boolean) => setState((prev) => ({ ...prev, open })), []);
  const setMode = useCallback((mode: AuthMode) => setState((prev) => ({ ...prev, mode })), []);
  const setEmail = useCallback((email: string) => setState((prev) => ({ ...prev, email })), []);
  const setPendingImport = useCallback(
    (pending: ProgressState | null) => setState((prev) => ({ ...prev, pendingImport: pending })),
    []
  );
  const openWith = useCallback(
    (opts: { mode?: AuthMode; email?: string }) =>
      setState((prev) => ({
        ...prev,
        open: true,
        mode: opts.mode ?? "signup",
        email: opts.email ?? prev.email,
      })),
    []
  );

  const value = useMemo(
    () => ({ state, setOpen, setMode, setEmail, setPendingImport, openWith }),
    [state, setOpen, setMode, setEmail, setPendingImport, openWith]
  );

  return <AuthDialogContext.Provider value={value}>{children}</AuthDialogContext.Provider>;
}

export function useAuthDialog(): AuthDialogContextValue {
  const ctx = useContext(AuthDialogContext);
  if (!ctx) throw new Error("useAuthDialog must be used within an AuthDialogProvider");
  return ctx;
}
